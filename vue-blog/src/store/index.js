import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

const state = {
  username: sessionStorage.getItem('user'),
  token: sessionStorage.getItem('token')
}

const mutations = {
  [types.LOGIN]: (state, data) => { //data是分发时额外的传入参数 载荷
    sessionStorage.setItem('user', data.name)
    if(data.token) sessionStorage.setItem('token', data.token)
    state.username = data.name
    state.token = data.token
  },
  [types.LOGOUT]: (state) => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    state.username = ''
    state.token = ''
  },
}

const actions = {
  userLogin({ commit }, data) {
    commit(types.LOGIN, data)
  },
  userLogout({ commit }) {
    commit(types.LOGOUT)
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions
})