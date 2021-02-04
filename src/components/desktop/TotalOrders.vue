<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <common-card
      title="累积订单量"
      value="2,345,567">
      <template>
        <div id="total-orders-chart" :style="{width: '100%', height: '100%'}">
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <span>昨日订单量</span>
          <span class="emphasis">367,567</span>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins'
export default {
  name: 'TotalOrders',
  mixins: [commonCardMixins],
  mounted () {
    let chartDom = document.getElementById('total-orders-chart')
    let echart = this.$echarts.init(chartDom)
    echart.setOption({
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'line',
        data: [200, 300, 657, 345, 200, 300, 657, 345],
        areaStyle: {
          color: 'purple'
        },
        lineStyle: {
          width: 0
        },
        itemStyle: {
          opacity: 0
        },
        smooth: true
      }],
      grid: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    })
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
