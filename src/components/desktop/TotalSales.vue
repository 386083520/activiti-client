<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <common-card
      title="累积销售额"
      value="￥345,567">
      <template>
        <div class="compare-wrapper">
          <div class="compare">
            <span>日同比</span>
            <span class="emphasis">7.33%</span>
            <div class="increase"></div>
          </div>
          <div class="compare">
            <span>月同比</span>
            <span class="emphasis">7.33%</span>
            <div class="decrease"></div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <span>昨日销售额</span>
          <span class="emphasis">￥567,567</span>
        </div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins'
export default {
  name: 'TotalSales',
  mixins: [commonCardMixins]
}
</script>

<style scoped lang="scss" type="text/scss">
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .compare {
    margin-top: 3px;
    color: #666;
    font-size: 12px;
    display: flex;
    align-items: center;
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
  }
}

.emphasis {
  margin-left: 5px;
  color: #333;
  font-weight: 700;
}
</style>
