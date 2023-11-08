import Vue from 'vue'
import 'reset-css'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/plugins/element/index'

Vue.config.productionTip = false


const render = ()=>{
  const app = new Vue({
    render: h => h(App),
    router,
    store
  })
  app.$mount('#app');
}

render();