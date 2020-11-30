<template>
  <div class="user-container">
    <bpmn></bpmn>
  </div>
</template>

<script>
import Bpmn from '../../../components/Bpmn'
export default {
  name: 'UserList',
  components: {
    Bpmn
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.user-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
