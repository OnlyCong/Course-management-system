import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//导入登录界面字体图标
import './assets/fonts/iconfont.css'
//导入全局样式
import './assets/css/global.css'
import axios from 'axios'
import store from './store/index'
import * as echarts from 'echarts'
import nprogress, { configure } from 'nprogress'

// import "nprogress/nprogress.css";



//bus总线通信
// var EventBus=new Vue()
// Object.defineProperties(Vue.prototype, {
//   $bus: {
//       get: function () {
//           return EventBus
//       }
//   }
// })





//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log("config==", config)
  if (config.url.indexOf("/dbapi") != -1) {
    config.baseURL = "";
  }

  //获取导航守卫
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
