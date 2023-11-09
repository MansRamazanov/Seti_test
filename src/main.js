import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

pinia.use((context) => {
    console.log(context)
    context.store.$subscribe((mutation, state) => {
        console.log(mutation, state)
    })
})

const app = createApp(App)
console.log('main')
app.use(router).use(pinia).mount('#app')
