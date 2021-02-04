<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <common-card
      title="累计用户数"
      value="2,345,567">
      <template>
        <div id="total-users-chart" :style="{ width: '100%', height: '100%' }"></div>
      </template>
      <template v-slot:footer>
        <div class="total-users-footer">
          <span>日同比</span>
          <span class="emphasis">8.73%</span>
          <div class="increase"></div>
          <span class="month">月同比</span>
          <span class="emphasis">8.73%</span>
          <div class="decrease"></div>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins'
export default {
  name: 'TotalUsers',
  mixins: [commonCardMixins],
  mounted () {
    let chartDom = document.getElementById('total-users-chart')
    let echart = this.$echarts.init(chartDom)
    echart.setOption({
      grid: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      xAxis: {
        show: false
      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [{
        type: 'bar',
        data: [200],
        barWidth: 10,
        stack: '总量',
        itemStyle: {
          color: '#45c946'
        }
      }, {
        type: 'bar',
        data: [250],
        barWidth: 10,
        stack: '总量',
        itemStyle: {
          color: '#eee'
        }
      }, {
        type: 'custom',
        data: [200],
        stack: '总量',
        renderItem: (param, api) => {
          const value = api.value(0)
          const endPoint = api.coord([value, 0])
          return {
            type: 'group',
            position: endPoint,
            children: [{
              type: 'path',
              shape: {
                d: 'M163.396608 289.168384c-40.577024 0-66.526208 54.183936-35.44064 85.25824L477.217792 723.704832c20.031488 20.031488 49.82272 20.031488 69.853184 0l349.274112-349.278208c30.30528-30.294016 6.677504-85.25824-34.927616-85.25824L163.396608 289.168384z',
                x: -5,
                y: -20,
                width: 10,
                height: 10,
                layout: 'cover'
              },
              style: {
                fill: '#45c946'
              }
            }, {
              type: 'path',
              shape: {
                d: 'M131.974144 648.752128c-30.418944 30.430208-6.474752 84.301824 34.917376 84.301824L858.258432 733.053952c42.899456 0 65.325056-53.85216 34.916352-84.301824L547.487744 302.569472c-19.930112-19.974144-49.374208-19.95264-69.327872 0L131.974144 648.752128z',
                x: -5,
                y: 10,
                width: 10,
                height: 10,
                layout: 'cover'
              },
              style: {
                fill: '#45c946'
              }
            }]
          }
        }
      }]
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
  .total-users-footer {
    display: flex;
    .increase {
      width: 0;
      height: 0;
      border-width: 3px;
      border-color: transparent transparent red transparent;
      border-style: solid;
      margin: 3px 0px 5px 2px;
    }
    .decrease {
      width: 0;
      height: 0;
      border-width: 3px;
      border-color: green transparent transparent transparent;
      border-style: solid;
      margin: 5px 0px 3px 2px;
    }
    .month {
      margin-left: 10px;
    }
  }
</style>
