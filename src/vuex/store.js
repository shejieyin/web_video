
import Vue from 'vue'
import Vuex from 'vuex'
import Login from './Login.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Login
  },
  state: {
    host: 'http://39.106.195.80:8000/',
    defaultAvatar: 'this.src="../static/avatar.png"',
    userAvatar: '../static/avatar.png',
    loginSwitch: false,
    loginTab: 0,
    token: ''
  },
  mutations: {
    CHANGE_LOGINSWITCH(state, loginSwitch) {
      console.log('-------1111---')
      console.log(loginSwitch)
      console.log(state)
      console.log('-------1111---')

      state.loginSwitch = loginSwitch;
    },
    CHANGE_LOGINTAB(state, loginTab) {
      state.loginTab = loginTab;
    },
    CHANGE_TOKEN(state, token) {
      (sessionStorage.getItem('token') !== token) && sessionStorage.setItem('token', token)
      state.token = token;
    }
  },
  actions: {
    CHANGE_LOGINSWITCH({
      commit
    }, loginSwitch) {
      console.log('--------sss---')
      commit('CHANGE_LOGINSWITCH', loginSwitch)
    },
    CHANGE_LOGINTAB({
      commit
    }, loginTab) {
      commit('CHANGE_LOGINTAB', loginTab)
    },
    CHANGE_TOKEN({
      commit
    }, token) {
      console.log(token)
      commit('CHANGE_TOKEN', token)
    },
  },
  getters: {
    token: state => {
      return state.token || sessionStorage.getItem('token')
    }
  }
})

export default store
