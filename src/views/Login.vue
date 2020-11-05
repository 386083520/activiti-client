<template>
  <div class="login-container ub main-center cross-center">
    <el-form
    @submit.native.prevent="submit"
    :rule="rules"
    :model="loginForm"
    label-width="80px">
    <el-form-item>
      <div>系统登陆</div>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      rules: {},
      loginForm: {}
    }
  },
  methods: {
    submit () {
    }
  }
}
</script>

<style scoped lang="scss">
  .login-container {
    height: 100%;
  }

</style>
