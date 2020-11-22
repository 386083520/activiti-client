<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    editable
    @tab-click="clickTab"
    @tab-remove="removeTab">
    <el-tab-pane
      :key="item.name"
      v-for="item in editableTabs"
      :label="item.title"
      :name="item.name"
    >
      {{item.content}}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  computed: {
    // 当前激活的选项卡
    editableTabsValue: {
      get () {
        return this.$store.state.MenuStore.editableTabsValue
      },
      set (val) {
        this.$store.state.MenuStore.editableTabsValue = val
      }
    },
    // tabs选项卡数据
    editableTabs: {
      get () {
        return this.$store.state.MenuStore.tabs
      },
      set (val) {
        this.$store.state.MenuStore.tabs = val
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    clickTab (tab) {
      let obj = {}
      obj.title = tab.label
      obj.name = tab.name
      obj.content = tab.remark
      console.log('gsd', obj)
      this.$store.commit('selectMenu', obj)
      this.$router.push({ name: tab.name })
    },
    // 删除选项卡
    removeTab (targetName) {
      if (targetName === 'desktop') {
        return
      }
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      sessionStorage.setItem('tabList', JSON.stringify(this.editableTabs))
      this.$store.commit('setActiveTabs', this.editableTabsValue)
      this.$router.push({name: this.editableTabsValue})
    }
  }
}
</script>

<style scoped>
</style>
