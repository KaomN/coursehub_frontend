import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPhone, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App)

library.add(faPhone)
library.add(faMagnifyingGlass)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createBootstrap())
app.use(store)
app.use(Vue3Toastify, {autoClose:2000, transition: toast.TRANSITIONS.SLIDE, position: toast.POSITION.TOP_RIGHT})
app.use(router)



app.mount('#app')
