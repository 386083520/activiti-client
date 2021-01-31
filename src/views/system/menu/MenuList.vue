<template>
  <div>
    <el-form
      style="margin-top:20px;"
      size="mini"
      ref="searchForm"
      label-width="80px"
      :model="searchForm">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-button size="mini" style="margin-left:20px;" icon="el-icon-search" type="primary" @click="searchBtn" >搜索</el-button>
        <el-button size="mini" icon="el-icon-plus" type="primary" @click="addBtn">新增 </el-button>
      </el-row>
    </el-form>
    <el-table
      :data="menuList"
      :height="tableHeight"
      style="width: 98%;margin: 0 auto"
      row-key="id"
      border>
      <el-table-column prop="label" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="图标" sortable width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon || ''"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目 录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜 单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按 钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单URL"></el-table-column>
      <el-table-column prop="path" label="路由地址"></el-table-column>
      <el-table-column prop="code" label="权限标识"></el-table-column>
      <el-table-column prop="orderNum" label="序号"></el-table-column>
      <el-table-column width="170" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editMenu(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="addTitle"
      :visible.sync="addVisible"
      width="40%"
      :before-close="handleClose" >
      <el-form :inline="true" size="mini" :model="addFrom" :rules="addMenuValdate" ref="addMenu" label- width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="type">
              <el-radio-group v-model="addFrom.type">
                <el-radio :label="0">目录</el-radio>
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上级菜单" @click.native="selectPrent" prop="parentName"> <el-input readonly v-model="addFrom.parentName"></el-input></el-form-item>
        <el-form-item label="权限名称" prop="label"> <el-input v-model="addFrom.label"></el-input> </el-form-item>
        <el-form-item v-if="addFrom.type != '2'" label="菜单图标" prop="icon"> <el-input v-model="addFrom.icon"></el-input> </el-form-item>
        <el-form-item v-if="addFrom.type == '1'" label="路由名称" prop="name"> <el-input v-model="addFrom.name"></el-input> </el-form-item>
        <el-form-item v-if="addFrom.type != '2'" label="路由地址" prop="path"> <el-input v-model="addFrom.path"></el-input> </el-form-item>
        <el-form-item v-if="addFrom.type == '1'" label="组件路径" prop="url"> <el-input v-model="addFrom.url"></el-input> </el-form-item>
        <el-form-item label="权限标识" prop="code"> <el-input v-model="addFrom.code"></el-input> </el-form-item>
        <el-form-item label="显示序号"> <el-input-number v-model="addFrom.orderNum"></el-input-number> </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCommit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="25%" title="上级菜单" :visible.sync="parentDialogVisible" append-to-body>
      <tree :nodes="parentNodes" :setting="parentSetting" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="parentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="parentDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tree from 'vue-giant-tree'
export default {
  name: 'MenuList',
  components: {
    tree
  },
  data () {
    return {
      menuList: [],
      searchForm: {
        name: ''
      },
      tableHeight: 0,
      addTitle: '新增菜单',
      editTag: '0',
      addVisible: false, // 是否展示新增弹窗
      addFrom: {
        id: '', // 编辑id
        label: '',
        name: '',
        type: 0,
        parentId: '',
        orderNum: '',
        parentName: '',
        path: '',
        code: '',
        icon: ''
      },
      parentDialogVisible: false,
      parentZtreeObj: null,
      parentNodes: [], // 上级部门树数据
      parentSetting: {
        view: {
          showLine: true,
          showIcon: false,
          fontCss: { 'font-size': '12px', color: '#333' }
        },
        data: {
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'pid',
            rootPId: '0'
          }
        },
        callback: {
          onClick: this.ztreeParentOnClick
        }
      },
      addMenuValdate: {
        type: [ { required: true, trigger: 'change', message: '请选择权限类型' } ],
        label: [ { required: true, trigger: 'change', message: '请填写权限名称' } ],
        parentName: [ { required: true, trigger: 'change', message: '请选择上级菜单' } ],
        name: [ { required: true, trigger: 'change', message: '请填写路由名称' } ],
        path: [ { required: true, trigger: 'change', message: '请填写路由地址' } ],
        url: [{ required: true, trigger: 'change', message: '请填写组件路径' }],
        code: [{ required: true, trigger: 'change', message: '请填写权限标识' }]
      }
    }
  },
  mounted () {
    this.getMenuList()
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 220
    })
  },
  methods: {
    async getMenuList () {
      let { data: res } = await this.$http.get('/system/sys-permission/getMenuList')
      if (res.code === 1) {
        this.menuList = res.data
      } else {
        this.menuList = []
      }
    },
    searchBtn () {
    },
    addBtn () {
      this.addVisible = true
      this.addTitle = '新增权限'
      this.editTag = '0'
      this.resetForm('addForm')
    },
    resetForm (formName) { // 重置表单数据
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    handleClose () {
      this.addVisible = false
    },
    ztreeParentOnClick (evt, treeId, treeNode) {
      this.addFrom.parentName = treeNode.name
      this.addFrom.parentId = treeNode.id
    },
    getCheckedNodes () {
    },
    selectPrent () {
      this.parentDialogVisible = true
      this.getPrentMenuList()
    },
    async getPrentMenuList () {
      let { data: res } = await this.$http.post('/system/sys-permission/getParentTree')
      if (res.code === 1) {
        this.parentNodes = res.data
      } else {
        this.parentNodes = []
      }
    },
    addCommit () {
      this.$refs.addMenu.validate(async valid => {
        if (valid) {
          let param = this.addFrom
          let url = ''
          if (this.editTag === '1') {
            url = '/system/sys-permission/editSave'
          } else {
            url = '/system/sys-permission/addPermission'
          }
          let { data: res } = await this.$http.post(url, param)
          if (res.code === 1) {
            this.$message.success('操作成功')
            this.getMenuList()
          } else {
            this.$message.success('操作失败')
          }
          this.addVisible = false
        }
      })
    },
    editMenu (row) {
      this.editTag = '1'
      this.addTitle = '编辑权限'
      this.resetForm('addMenu')
      this.addVisible = true
      this.addFrom.id = row.id
      this.addFrom.code = row.code
      this.addFrom.icon = row.icon
      this.addFrom.label = row.label
      this.addFrom.name = row.name
      this.addFrom.orderNum = row.orderNum
      this.addFrom.parentId = row.parentId
      this.addFrom.parentName = row.parentName
      this.addFrom.path = row.path
      this.addFrom.type = row.type
      this.addFrom.url = row.url
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 4px;
}
</style>
