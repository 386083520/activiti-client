<template>
  <div class="desktop">
    <top-view></top-view>
    <sales-view></sales-view>
    <bottom-view></bottom-view>
    <map-view></map-view>
  </div>
</template>

<script>
import TopView from '@/components/desktop/TopView'
import SalesView from '@/components/desktop/SalesView'
import BottomView from '@/components/desktop/BottomView'
import MapView from '@/components/desktop/MapView'
export default {
  name: 'Desktop',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  }
}
</script>

<style scoped>
.desktop {
  width: 100%;
  height: 100%;
  background: #eee;
  padding: 20px;
  box-sizing: border-box;
}
</style>
