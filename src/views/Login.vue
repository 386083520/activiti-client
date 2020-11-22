<template>
  <div class="login-container ub main-center cross-center">
    <el-form
    size="medium"
    @submit="submit"
    :rules="submitRules"
    ref="loginForm"
    :model="loginForm"
    class="login-form"
    label-width="80px"
    style="margin-left: 0">
      <el-form-item label>
        <div class="login-title ub main-center cross-center">系统登陆</div>
      </el-form-item>
      <el-form-item prop="username" label>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          type="text"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label>
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="loginForm.code" readonly placeholder="点击刷新"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button class="my-button" type="primary" @click="submit">登陆</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="my-button">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      submitRules: {
        username: [
          {
            required: true,
            trigger: 'change',
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'change',
            message: '请输入密码'
          }
        ],
        code: [
          {
            required: true,
            trigger: 'change',
            message: '请输入验证码'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      let that = this
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          /* let params = {
            username: that.loginForm.username,
            password: that.loginForm.password,
            code: that.loginForm.code
          } */
          let formData = new FormData()
          formData.append('username', that.loginForm.username)
          formData.append('password', that.loginForm.password)
          formData.append('code', that.loginForm.code)
          let {data: res} = await that.$http.post('/api/user/login', formData)
          if (res.code === 1) {
            let menuList = res.data.menuList
            let routerList = res.data.routerList
            let authList = res.data.authList
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('userId', res.data.userId)
            sessionStorage.setItem('menuList', JSON.stringify(menuList))
            sessionStorage.setItem('routerList', JSON.stringify(routerList))
            sessionStorage.setItem('authList', JSON.stringify(authList))
            this.$store.commit('getMenuList', this.$router)
            this.$router.push('/home')
          } else {
            that.$message.error(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .login-container {
    height: 100%;
    .login-form {
      height: 300px;
      width: 350px;
      border-radius: 10px;
      box-shadow: 0 0 25px #cac6c6;
      padding: 20px 30px;
      .login-title {
        font-size: 24px;
        font-weight: 400;
      }
      .my-button {
        width: 100%;
      }
    }
  }
  /deep/ .el-form-item__content{
    margin-left: 0px !important;
  }
</style>
