import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/app'
import Cookies from 'js-cookie'
import * as Helper from '@/helpers/helpers';
import api from '@/api';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

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

const app = createApp(App)

app.config.globalProperties.$cookies = Cookies
app.config.globalProperties.$helper = Helper
app.config.globalProperties.$api = api

if(Cookies.get('loggedIn')){
  app.config.globalProperties.$dataAuth = Helper.decrypData(Cookies.get('loginData'))
}

app.use(vuetify)
app.use(router)
app.mount('#kt_body')