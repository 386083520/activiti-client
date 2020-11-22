// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/flex.css'
import axios from 'axios'
import store from './store'
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.interceptors.request.use(config => {
  if (config.url.indexOf('/api/user/login') !== -1) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

Vue.use(ElementUI)
/* eslint-disable no-new */

// 进入路由之前执行
router.beforeEach((to, from, next) => {
  store.commit('getTabs')
  store.commit('setActiveTabs', to.name)
  let menuList = sessionStorage.getItem('menuList')
  if (to.path === '/login') {
    if (menuList) {
      next({path: '/home'})
    } else {
      next()
    }
  } else {
    if (!menuList) {
      next({path: '/login'})
    } else {
      if (store.state.MenuStore.menuList.length === 0) {
        store.commit('getMenuList', router)
        next({ path: to.path })
      } else {
        next()
      }
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
