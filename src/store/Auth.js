import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import Cookies from 'js-cookie'

const Auth = createStore({
  state() {
    return {
      data: {}
    }
  },
  mutations: {
    loginData(state, payload) {
      state.data = payload
    },
  },
  actions: {
    loginData({ commit }, payload) {
      commit('loginData', payload)
    },
  },
  getters: {
    loginData(state) {
      return state.data
    },
  },

  plugins: [createPersistedState({
    // storage: {
    //   getItem: key => Cookies.get(key), // Menggunakan cookies sebagai tempat penyimpanan
    //   setItem: (key, value) => Cookies.set(key, value),
    //   removeItem: key => Cookies.remove(key)
    // },
    key: 'AuthData'
  })]
})

export default Auth
