<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <common-card
      title="今日交易用户数"
      value="2,345,567">
      <template>
        <v-charts :options="getOptions()" style="width: 100%; height: 100%"></v-charts>
      </template>
      <template v-slot:footer>
        <div>
          <span>退货率</span>
          <span class="emphasis">5.14%</span>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins'
export default {
  name: 'TodayUsers',
  mixins: [commonCardMixins],
  mounted () {
  },
  methods: {
    getOptions () {
      return {
        color: ['#3398DB'],
        series: [{
          type: 'bar',
          data: [200, 300, 657, 345, 200, 300, 657, 345],
          barWidth: '60%'
        }],
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
          show: false
        },
        yAxis: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .emphasis {
    margin-left: 5px;
    color: #333;
    font-weight: 700;
  }
</style>
