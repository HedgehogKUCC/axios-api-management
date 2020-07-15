import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'index',
  },
  {
    path: '/',
    name: 'ProductList',
    component: () => import('@/views/Dashboard/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
