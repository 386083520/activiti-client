<template>
  <div>
    user
  </div>
</template>

<script>
export default {
  name: 'UserList',
  mounted () {
    this.$http.get('/system/sys-user/findUsers')
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
