import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { LoaderPlugin } from 'vue-google-login'

Vue.use(LoaderPlugin, {
  client_id:
    '910434565819-ee994s16afd2h33c8pof42ai4iidrveo.apps.googleusercontent.com'
})

Vue.GoogleAuth.then(auth2 => {
  console.log(auth2.isSignedIn.get())
  console.log(auth2.currentUser.get())
})
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('format', function(el, binding, vnode) {
  const modifiers = binding.modifiers
  if (modifiers.extrabold) {
    el.style.fontFamily = 'airbnb-bold'
  }
  if (modifiers.bold) {
    el.style.fontFamily = 'airbnb-medium'
  }
  if (modifiers.highlight) {
    el.style.background = '#ffff00'
  }
})
