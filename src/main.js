import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import './assets/css/index.css'

const pinia = createPinia()

pinia.use((context) => {
    // console.log(context)
    context.store.$subscribe((mutation, state) => {
        // console.log(mutation, state)
    })
})

const app = createApp(App)
app.use(router).use(pinia).mount('#app')
