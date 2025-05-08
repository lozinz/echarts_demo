import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routers  from './router/index' 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(routers)
app.use(ElementPlus)
app.mount('#app')
