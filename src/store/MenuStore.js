import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default{
  state: {
    editableTabsValue: 'desktop',
    tabs: [
      {
        title: '首页',
        name: 'desktop',
        content: 'fds'
      }
    ],
    menuList: [],
    isCollapse: false
  },
  mutations: {
    selectMenu (state, menu) {
      let res = state.tabs.findIndex(item => item.name === menu.name)
      if (res === -1) {
        let obj = {}
        obj.title = menu.label
        obj.name = menu.name
        obj.content = menu.remark
        state.tabs.push(obj)
      }
      state.editableTabsValue = menu.name
      sessionStorage.setItem('tabList', JSON.stringify(state.tabs))
    },
    getTabs (state) {
      let tabs = sessionStorage.getItem('tabList')
      if (tabs) {
        state.tabs = JSON.parse(tabs)
      }
    },
    setActiveTabs (state, val) {
      state.editableTabsValue = val
    },
    getMenuList (state, router) {
      let menuList = sessionStorage.getItem('menuList')
      if (menuList) {
        state.menuList = JSON.parse(menuList)
      }
      let routerList = []
      let oldRouterList = sessionStorage.getItem('routerList')
      if (oldRouterList) {
        routerList = JSON.parse(oldRouterList)
      }
      let oldRouter = router.options.routes
      routerList.forEach(item => {
        item.component = () => import(`@/views${item.url}.vue`)
        oldRouter[2].children.push(item)
      })
      router.addRoutes(oldRouter)
    },
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
