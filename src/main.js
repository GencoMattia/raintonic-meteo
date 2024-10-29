import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap";
import axios from 'axios';

const app = createApp(App)

app.use(router)

app.mount('#app')
