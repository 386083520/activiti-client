<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card>
          <total-sales></total-sales>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <total-orders></total-orders>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <today-users></today-users>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <total-users></total-users>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSales from '@/components/desktop/TotalSales'
import TotalOrders from '@/components/desktop/TotalOrders'
import TodayUsers from '@/components/desktop/TodayUsers'
import TotalUsers from '@/components/desktop/TotalUsers'
export default {
  name: 'TopView',
  components: {
    TotalSales,
    TotalOrders,
    TodayUsers,
    TotalUsers
  }
}
</script>

<style scoped>

</style>
