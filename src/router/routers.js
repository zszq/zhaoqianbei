import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// VueRouter.prototype.goBack = function () {
//   this.isBack = true   //判断是否是返回操作
//   window.history.go(-1)
// }

import dake from '../components/dake/dake'
  import dakeIntro from '../components/dake/dakeIntro'
  import keDetails from '../components/dake/keDetails'
  import teDetails from '../components/dake/teDetails'
import xiaoke from '../components/xiaoke/xiaoke'
  import xiaokeIntro from '../components/xiaoke/xiaokeIntro'
  import xiaokeDetails from '../components/xiaoke/xiaokeDetails'
import message from '../components/message/message'
  import msgList from '../components/message/msgList'
  import dialogue from '../components/message/dialogue'
  import search from '../components/message/search'
import user from '../components/user/user'
  import login from '../components/user/login'
  import register from '../components/user/register'
  import resetNickname from '../components/user/resetNickname'
  import verifyCode from '../components/user/verifyCode'
  import resetPassword from '../components/user/resetPassword'
  import protocol from '../components/user/protocol'
  import home from '../components/user/home'
  import information from '../components/user/information'
  import mySenior from '../components/user/mySenior/mySenior'
  import task from '../components/user/task/task'
  import senior from '../components/user/senior'
  import certification from '../components/user/certification'
  import setting from '../components/user/setting'
import articles from '../components/other/articles'
import pageError from '../components/other/pageError'

const routes = [
  {path: '/', redirect: '/dake'},
  {path: '/dake', component: dake,
    children: [
      {path: '/', redirect: 'dakeIntro'},
      {path: "dakeIntro", component: dakeIntro, name: "dakeIntro", meta: {index: 0}},
      {path: "keDetails", component: keDetails, name: "keDetails", meta: {index: 1}},
      {path: "teDetails/:qianId/:user_name", component: teDetails, name: "teDetails", meta: {index: 1}}
    ]
  },
  {path: '/xiaoke', component: xiaoke,
    children: [
      {path: '/', redirect: 'xiaokeIntro'},
      {path: "xiaokeIntro", component: xiaokeIntro, name: "xiaokeIntro", meta: {index: 0}},
      {path: "xiaokeDetails", component: xiaokeDetails, name: "xiaokeDetails", meta: {index: 1}}
    ]
  },
  {path: '/message', component: message,
    children: [
      {path: '/', redirect: 'msgList'},
      {path: 'msgList', component: msgList, name: "msgList", meta: {index: 0}},
      {path: 'dialogue/:uid/:qian_name', component: dialogue, name: "dialogue", meta: {requiresAuth: true, index: 1}},
      {path: 'search', component: search, name: "search", meta: {requiresAuth: true, index: 1}}
    ]
  },
  {path: '/user', component: user,
    children: [
      {path: '/', redirect: 'home'},
      {path: 'home', component: home, name: "home", meta: {requiresAuth: true, index: 0}},
      {path: 'information', component: information, name: "information", meta: {requiresAuth: true, index: 1}},
      {path: 'mySenior', component: mySenior, name: "mySenior", meta: {requiresAuth: true, index: 1}},
      {path: 'task', component: task, name: "task", meta: {requiresAuth: true, index: 1}},
      {path: 'senior', component: senior, name: "senior", meta: {requiresAuth: true, index: 1}},
      {path: 'certification', component: certification, name: "certification", meta: {requiresAuth: true, index: 2}},
      {path: 'setting', component: setting, name: "setting", meta: {requiresAuth: true, index: 1}},

      {path: 'login', component: login, name: "login", meta: {index: 0}},
      {path: 'register', component: register, name: "register", meta: {index: 1}},
      {path: 'resetNickname', component: resetNickname, name: "resetNickname", meta: {requiresAuth: true, index: 2}},
      {path: 'verifyCode', component: verifyCode, name: "verifyCode", meta: {index: 2}},
      {path: 'resetPassword', component: resetPassword, name: "resetPassword", meta: {index: 3}},
      {path: 'protocol', component: protocol, name: "protocol", meta: {index: 2}}
    ]
  },
  {path: '/index/jishuDetail/id/:id', component: articles, name: 'articles'},
  {path: '*', component: pageError}
]

export default new VueRouter({
  // mode:'history',
  routes
})
