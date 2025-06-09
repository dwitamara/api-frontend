import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SewaLapangan from '../views/SewaLapangan.vue';
import Community from '../views/Community.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailLapangan from '../views/DetailLapangan.vue';
import DetailPembayaran from '../views/DetailPembayaran.vue';
import AdminLogin from '../views/AdminLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sewa-lapangan',
    name: 'SewaLapangan',
    component: SewaLapangan,
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('@/views/AdminLogin.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
  },
  {
    path: '/detail-lapangan/:id',
    name: 'DetailLapangan',
    component: DetailLapangan,
    props: true,
  },
  {
    path: '/detail-pembayaran/:id',
    name: 'DetailPembayaran',
    component: DetailPembayaran,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
