import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './theme/index.css'    //绿色主题


import Vant from 'vant';
import 'vant/lib/index.css';

// import 'element-ui/lib/theme-chalk/index.css'  //蓝色主题

// import 'form-making/dist/FormMaking.css'
// import FormMaking from 'form-making'
import FormMaking from './index'
Vue.use(FormMaking)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(Vant);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
