// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.productionTip = false;

import App from './App'
import router from './router'

import Element from 'element-ui';
Vue.use(Element);
import 'element-ui/lib/theme-chalk/index.css';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
