<template>
  <el-container class="home">
    <el-header class="ub main-justify cross-center header">
      <div class="header-left-text">工作流管理</div>
      <div class="ub main-center cross-center">
        <el-dropdown placement="bottom-start">
          <img src="../assets/images/avatar.jpg" class="user-img">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user-role">
          <div class="welcome">管理员，欢迎你</div>
          <div class="header-time">2020-08-11 22:22:16 星期五</div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <menu-bar></menu-bar>
      </el-aside>
      <el-container>
        <el-main style="padding: 0">
          <i :class="[isCollapse? 'el-icon-s-unfold': 'el-icon-s-fold',  'arrow-icon']" @click="iconClick"></i>
          <tabs></tabs>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from '../components/MenuBar'
import Tabs from '../components/Tabs'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    MenuBar,
    Tabs
  },
  computed: {
    ...mapState({
      isCollapse: state => state.MenuStore.isCollapse
    })
  },
  methods: {
    iconClick () {
      this.$store.commit('setCollapse')
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  /deep/ .el-tabs__header {
    position: static;
  }
  .home {
    height: 100%;
    .header {
      background-color: #167bd8;
      color: #fff;
      .header-left-text {
        font-size: 20px;
      }
      .user-img {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        cursor: pointer;
      }
      .user-role {
        margin-left: 10px;
        .welcome {
          font-size: 15px;
          font-weight: bolder;
        }
        .header-time {
          font-size: 14px;
        }
      }
    }
    .arrow-icon {
      font-size: 24px;
      border: 1px solid transparent;
      height: 39px;
      width: 40px;
      text-align: center;
      line-height: 39px;
      float: left;
      z-index: 1000;
      cursor: pointer;
    }
  }
</style>
