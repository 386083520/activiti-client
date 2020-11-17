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
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from '../components/MenuBar'
export default {
  name: 'Home',
  components: {
    MenuBar
  }
}
</script>

<style scoped lang="scss" type="text/scss">
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
  }
</style>
