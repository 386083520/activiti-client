<template>
  <div>
    user
  </div>
</template>

<script>
export default {
  name: 'UserList',
  mounted () {
    this.$http.post('/system/sys-user/findUsers')
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
