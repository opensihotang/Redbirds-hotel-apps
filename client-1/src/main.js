import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import vue3GoogleLogin  from 'vue3-google-login'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css'


const app = createApp(App)
app.use(ToastPlugin)

app.use(vue3GoogleLogin, {
  clientId: '425645206671-ht5ut2u05djfr1b9eg4ca8jc024fqv5n.apps.googleusercontent.com'
})

app.mount('#app')