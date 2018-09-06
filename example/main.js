// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import DemoBlock from './demo-block.vue'
import gfui from '../src/index'

Vue.component('demo-block', DemoBlock)
// import iview from 'iview'
Vue.use(gfui)
// import 'iview/dist/styles/iview.css';
import '../src/index.less'
import './assets/docs.css'
import 'highlight.js/styles/mono-blue.css';


Vue.config.productionTip = false
// Vue.use(iview)
Vue.prototype.http = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
