import { createApp, reactive, provide } from 'vue'
import App from './App.vue'
import router from './routers/app'

const app = createApp(App)

app.use(router)
app.mount('#kt_body')