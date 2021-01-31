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
  config.headers.token = sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 601) {
        sessionStorage.clear()
        window.location.href = '/'
        return response
      } else {
        return Promise.resolve(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      this.$message.error(error.response.data.msg)
      if (error.response.data.code === 601) {
        sessionStorage.clear()
        window.location.href = '/'
        return Promise.reject(error.response)
      }
    }
  })

Vue.use(ElementUI)
/* eslint-disable no-new */

// 进入路由之前执行
router.beforeEach((to, from, next) => {
  store.commit('getTabs')
  store.commit('setActiveTabs', to.name)
  let token = sessionStorage.getItem('token')
  if (to.path === '/login') {
    if (token) {
      next({path: '/home'})
    } else {
      next()
    }
  } else {
    if (!token) {
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
