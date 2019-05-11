// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from "./vuex/store.js"

import router from './router/routers'
// 判断是否需要登录，需要登录而没有登录则跳转到登录页
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!sessionStorage.getItem("isLogin")) {
      next({
        path: "/user/login",
        query: {redirect: to.fullPath} // 登录后跳转到先前页面
      });
    }else{
      next();
    }
  }else{
    next();
  }
})

// 异步请求插件
import Axios from 'axios'
if (process.env.NODE_ENV === 'development') {
  Axios.defaults.baseURL = "";
} else {
  Axios.defaults.baseURL = "https://www.zhaoqianbei.com";
}
Vue.prototype.$axios = Axios

// 序列化数据插件
import Qs from 'qs'
Vue.prototype.$qs = Qs

// 引用Mint UI框架的Popup弹出框组件Picker选择器组件和DatetimePicker日期时间选择器组件
import { Popup, Picker, DatetimePicker } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);

//通过common下的index.js文件导入公共组件并进行全局组件注册避免每次使用都导入
import components from './components/common/index.js'
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})

// 简易toast和confirm插件(待完善)
import Toast from "./plugins/toast/toast.js"
Vue.use(Toast)
import Confirm from "./plugins/confirm/confirm.js"
Vue.use(Confirm)

// 简易指令(待完善)
import {feedback, focus} from './directive/directive'
Vue.use(feedback)
Vue.use(focus)

// 引入样式
import './assets/style/reset.css' // 引入reset样式
import './assets/style/publicCss.css' // 引入公共样式
import './assets/stylus/index.styl' // 引入自定义样式
import '../static/iconfonts/iconfont.css' // 引入矢量图标


Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue() //this.$root.eventHub.$emit()
  },
  store
})
