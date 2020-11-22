<template>
  <el-menu
    :default-active="$route.path"
    class="menu-bar"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    unique-opened
  >
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>

<script>
import MenuItem from '../components/MenuItem'
import { mapState } from 'vuex'
export default {
  name: 'MenuBar',
  components: {
    MenuItem
  },
  computed: {
    ...mapState({
      menuList: state => state.MenuStore.menuList,
      isCollapse: state => state.MenuStore.isCollapse
    })
  },
  data () {
    return {
    }
  },
  methods: {
    handleOpen () {
    },
    handleClose () {
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .menu-bar:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }
  .el-aside {
    border-right: 1px solid #e6e6e6;
  }
</style>
