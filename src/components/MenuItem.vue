<template>
  <fragment>
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children.length > 0" :index="menu.path" :key="menu.path">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span style="font-size: 15px;font-weight: 600" slot="title">{{menu.label}}</span>
        </template>
        <menu-item :menuList="menu.children"></menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.path" :key="menu.path" @click="selectMenu(menu)">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.label}}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MenuItem
  },
  methods: {
    selectMenu (menu) {
      this.$store.commit('selectMenu', menu)
      this.$router.push({ name: menu.name })
    }
  }
}
</script>

<style scoped>

</style>
