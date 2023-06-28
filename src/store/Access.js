import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import Cookies from 'js-cookie'

const Access = createStore({
  state() {
    return {
      data: {}
    }
  },
  mutations: {
    setData(state, payload) {
      state.data = payload
    }
  },
  actions: {
    setData({ commit }, payload) {
      commit('setData', payload)
    }
  },
  getters: {
    getData(state) {
      return state.data
    }
  },

  plugins: [createPersistedState({
    // storage: {
    //   getItem: key => Cookies.get(key), // Menggunakan cookies sebagai tempat penyimpanan
    //   setItem: (key, value) => Cookies.set(key, value),
    //   removeItem: key => Cookies.remove(key)
    // },
    key: 'Access'
  })]
})

export default Access
