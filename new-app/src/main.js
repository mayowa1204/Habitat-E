import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
