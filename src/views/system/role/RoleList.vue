<template>
  <el-main>
    <el-form :model='roleForm' size='mini' label-width='80px'>
      <el-row>
        <el-col :span='5'>
          <el-form-item label='名称'>
            <el-input v-model='roleForm.roleName' placeholder='请输入角色名称'></el-input>
          </el-form-item>
        </el-col>
        <el-button class='searchBtn' type='primary' size='mini' icon='el-icon-search' @click="searchBtn">查询</el-button>
        <el-button class='searchBtn' type='primary' size='mini' icon='el-icon-search' @click="openAddRole">新增</el-button>
      </el-row>
    </el-form>
    <el-table
      :data='tableData'
      size='mini'
      :stripe='true'
      :height='tableHeight'
      border style='width: 100%'
    >
      <el-table-column prop='name' label='角色名称'></el-table-column>
      <el-table-column prop='remark' label='备注'></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.native.prevent="editRole(scope)">编辑</el-button>
          <el-button type="success" size="mini" @click.native.prevent="assignRole(scope)">分配权限</el-button>
          <el-button type="danger" size="mini" @click.native.prevent="deleteRole(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total" ></el-pagination>
    <el-dialog :title="editTitle" :visible="roleVisible" width="42%">
      <el-form :rules='rules' :model="addRoleForm"  size="mini" :inline="true" ref="addRole">
        <el-form-item label="角色名称" label-width="80px" prop="name">
          <el-input v-model="addRoleForm.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="remark">
          <el-input v-model="addRoleForm.remark" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="authTitle" :visible="authVisible" width="30%" class="self-dialog">
      <tree
        :nodes="treeDatas"
        :setting="setting"
        @onCheck="ztreeOnCheck"
        @onCreated="handleCreated"></tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAssign">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import tree from 'vue-giant-tree'
export default {
  name: 'RoleList',
  components: {
    tree
  },
  mounted () {
    this.getRoleList()
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 240
    })
  },
  data () {
    return {
      rules: { // 表单验证
        name: [{
          required: true,
          trigger: 'change',
          message: '请输入角色名称'
        }]
      },
      roleVisible: false, // 新增、编辑弹框是否展示
      editTag: '0',
      authVisible: false, // 权限弹窗是否展示
      currentPage: 1,
      pageSize: 10,
      total: 0,
      roleForm: {
        roleName: ''
      },
      tableData: [],
      tableHeight: window.innerHeight,
      editTitle: '', // 弹窗标题
      authTitle: '', // 分配角色弹窗
      addRoleForm: { // 添加或编辑角色弹窗数据
        id: '',
        name: '',
        remark: ''
      },
      ztreeObj: null,
      setting: { // z-tree的配置
        check: {
          enable: true // 是否展示单选框
        },
        data: {
          simpleData: {
            enable: true, // 是否使用简单数据
            idKey: 'id',
            pIdKey: 'pid',
            rootPId: '0'
          }
        },
        callback: { // 回调函数
          onCheck: this.ztreeOnCheck
        }
      },
      treeDatas: []
    }
  },
  methods: {
    handleSizeChange () {
    },
    editRole (scope) { // 编辑权限
      this.editTag = '1'
      this.resetForm('addRole')
      this.editTitle = '编辑角色'
      this.roleVisible = true
      // 显示需要编辑的数据
      console.log('gsd666', scope.row)
      this.addRoleForm.id = scope.row.id
      this.addRoleForm.name = scope.row.name
      this.addRoleForm.remark = scope.row.remark
    },
    ztreeOnCheck () {
    },
    handleCreated: function (zTreeObj) {
      this.ztreeObj = zTreeObj
      zTreeObj.expandAll(true)
    },
    async assignRole (scope) {
      this.authTitle = '分配权限'
      this.authVisible = true
      let param = {
        userId: sessionStorage.getItem('userId'),
        roleId: scope.row.id
      }
      let { data: res } = await this.$http.post('/system/sys-permission/permissionTree', param)
      if (res.code === 1) {
        this.treeDatas = res.data
      } else {
        this.treeDatas = []
      }
    },
    deleteRole (scope) {
      this.$confirm('确认删除吗？', '系统提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let param = {
          id: scope.row.id
        }
        let { data: res } = await this.$http.post('/system/sys-role/deleteById', param)
        if (res.code === 1) {
          this.$message.success('删除成功')
          this.getRoleList()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    resetForm (formName) { // 重置表单数据
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    confirmSubmit () { // 确实提交表单数据
      this.$refs.addRole.validate(async valid => {
        if (valid) {
          let url = ''
          if (this.editTag === '0') {
            url = '/system/sys-role/addRole'
          } else {
            url = '/system/sys-role/updateRole'
          }
          let { data: res } = await this.$http.post(url, this.addRoleForm)
          if (res.code === 1) {
            this.roleVisible = false
            this.$message.success('操作成功')
            this.getRoleList()
          } else {
            this.$message.success('添加失败')
          }
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRoleList()
    },
    openAddRole () { // 打开新增
      this.editTag = '0'
      this.resetForm('addRole')
      this.editTitle = '新增角色'
      this.roleVisible = true
    },
    searchBtn () { // 查询列表数据
      this.getRoleList()
    },
    async getRoleList () {
      let param = {
        title: this.roleForm.roleName,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }

      let { data: res } = await this.$http.post('/system/sys-role/getRoleList', param)
      if (res.code === 1) {
        this.tableData = res.data.records
        this.total = res.data.total
      }
    },
    saveAssign () { // 保存角色权限分配

    }
  }
}
</script>

<style scoped>
  .searchBtn {
    margin-left: 15px;
  }
  .el-main{
    padding-top: 5px;
  }
  .self-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .self-dialog /deep/ .el-dialog {
    margin: 0 auto;
    height: 80%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
  .self-dialog /deep/ .el-dialog .el-dialog__body {
    padding-top: 5px;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 40px;
  }
  .self-dialog /deep/ .el-dialog .el-dialog__footer{
    left: 40%;
    bottom: 0;
    position: absolute;
  }
</style>
