// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import colors from 'vuetify/es5/util/colors'

import 'vuetify/dist/vuetify.min.css'

axios.defaults.baseURL = 'http://www.rotaract4630.com.br/rac4630/public/api/'

Vue.use(Vuetify, {
  theme: {
    primary: '#D81B5D',
    secondary: colors.grey.darken1,
    accent: colors.indigo.accent1,
    modal: '#D81B5D'
  }
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
