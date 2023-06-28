import { createApp } from 'vue'
import App from './App.vue'
import globalComponent from '@/components/Material/index'
import { ModelSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

import router from './routers/app'
import Cookies from 'js-cookie'
import * as Helper from '@/utils/helpers';
import api from '@/utils/api';
import Swal from 'sweetalert2';

import store from '@/store/index'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

const app = createApp(App)

async function main(){
  const vuetify = createVuetify({
      components: {
          ...components,
          ...labs,
        },
        defaults: {
          VDataTable: {
            fixedHeader: true,
            noDataText: 'Results not found',
          },
      },
      directives,
  })

  // global
  app.config.globalProperties.$cookies = Cookies
  app.config.globalProperties.$router = router
  app.config.globalProperties.$api = api
  app.config.globalProperties.$helper = Helper
  app.config.globalProperties.$swal = Swal

  // store
  app.config.globalProperties.$store = store

  router.beforeEach((to, from, next) => {      
    if(Cookies.get('loggedIn')){
      const Auth = Helper.decrypData(Cookies.get('loginData'))
      app.config.globalProperties.$dataAuth = Helper.decrypData(Cookies.get('loginData'))
      api.defaults.headers.common['Authorization'] = `${Auth.token_type} ${Auth.token}`;
    }

    if((from.path === '/login' || from.path === 'register') && to.path === '/'){
      window.location.href = '/';
    }
    next()
  })

  if(store.modules.Auth.getters.loginData.loggedIn){
    const Auth = store.modules.Auth.getters.loginData
    app.config.globalProperties.$dataAuth = Auth
    api.defaults.headers.common['Authorization'] = `${Auth.token_type} ${Auth.token}`;
  }

  app.component('model-select', ModelSelect)

  for (const compoenent in globalComponent) {
    app.component(compoenent, globalComponent[compoenent])
  }

  app.use(vuetify)
  app.use(router)
  app.mount('#kt_body')
}

main();