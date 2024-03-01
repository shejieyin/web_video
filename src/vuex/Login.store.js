import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const Login = {
  namespaced: true,
  state: {
    user: {
      user_id: 111,
      nickname: 'Barry',
      signture: 'I can do it !',
      avatar_url: '',
      mobile: '15942205021',
      sex: '2',
      birth_date: ''
    }
  },
  mutations: {
    CHANGE_USER(state, {
      user
    }) {
      typeof (user) == "object" && (state.user = user);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {
    CHANGE_USER({
      commit
    }, {
      user
    }) {
      typeof (user) == "object" && commit('CHANGE_USER', {
        user
      });
    },
  },
  getters: {
    user: state => {
      console.log(state.user)
      return state.user || JSON.parse(sessionStorage.getItem('user'))
    }
  }
}

export default Login
