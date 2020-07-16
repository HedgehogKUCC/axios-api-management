import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap';
import { apiUserCheck } from './api/index';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)0717Demo\s*=\s*([^;]*).*$)|^.*$/, '$1');

    const params = {
      Authorization: `Bearer ${token}`,
      api_token: `${token}`,
    };

    apiUserCheck(params).then((res) => {
      if (res.data.success) {
        next();
      } else {
        next({
          path: '/',
        });
      }
    });
  } else {
    next();
  }
});
