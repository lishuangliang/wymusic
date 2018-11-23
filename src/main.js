// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

import indicator from './plugins/indicator'
import toast from './plugins/toast'
import alert from './plugins/alert'

import FastClick from 'fastclick';
import loading from './assets/images/confused.jpg';
import error from './assets/images/error.jpg';

FastClick.attach(document.body);
import Vconsole from 'vconsole'
let vConsole = new Vconsole();



Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  error,
  loading
});

Vue.use(indicator);
Vue.use(toast);
Vue.use(alert);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
