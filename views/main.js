import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import index from './vue/index.vue';

require('./css/app.css');

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.debug = true;

const router = new VueRouter({
  routes: [
    { path: '/', component: index },
  ]
});

new Vue({
  router,
}).$mount('#app');
