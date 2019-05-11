import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var state = {
  detail: null // 存储大课、小课或者个人资料的详情
}

var getters = {
  // 获取detail
  get_detail(state) {
    return state.detail;
  }
}

var mutations = {
  // 修改detail
  set_detail(state, detail) {
    state.detail = detail;
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})
export default store;
