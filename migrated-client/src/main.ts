import { createApp } from 'vue';  
import App from './App.vue';       
import { createPinia } from 'pinia'; 
import router from './router/index';    
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import io from 'socket.io-client';


/*const socket = io('https://sofii-vsly-pkta.onrender.com', {
    withCredentials: true 
})

socket.on('connect', () => {
    console.log("WS CONNECTED")
})*/


const queryClient = new QueryClient(); 

const app = createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin, { queryClient })
  .mount('#app');
  
 