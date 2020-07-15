import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/petlist',
    name: 'PetList',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
