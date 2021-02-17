<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="sales-view">
    <el-card shadow="hover">
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            mode="horizontal"
            :default-active="activeIndex"
            @select="onMenuSelect">
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              type="daterange"
              v-model="date"
              size="small"
              :picker-options="pickOptions"
              range-separator="至"
              end-placeholder="结束时间"
              start-placeholder="开始时间">

            </el-date-picker>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SalesView',
  data () {
    return {
      activeIndex: '1',
      radioSelect: '今日',
      date: null,
      pickOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
          }
        }, {
          text: '最近一月',
          onClick (picker) {
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
          }
        }]
      }
    }
  },
  methods: {
    onMenuSelect (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.sales-view {
  margin-top: 20px;
  .menu-wrapper {
    display: flex;
  }
}
</style>
