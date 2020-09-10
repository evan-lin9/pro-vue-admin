import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as ProComponent from './components'

Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });

Object.values(ProComponent).forEach(i => {
  Vue.component(i.name, i)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
