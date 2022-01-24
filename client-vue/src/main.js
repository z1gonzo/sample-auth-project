import Vue from 'vue';
import 'bootswatch/dist/superhero/bootstrap.css';

import App from './App.vue';
import router from './router';

require('dotenv').config();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
