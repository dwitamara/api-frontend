import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SewaLapangan from '../views/SewaLapangan.vue';
import Community from '../views/Community.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailLapangan from '../views/DetailLapangan.vue';
import DetailPembayaran from '../views/DetailPembayaran.vue';

const routes = [
  {
    path: '/',
    name: 'Home',          // Disarankan menamai route agar lebih mudah navigasi dengan named routes
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
    path: '/detail-lapangan/:id',
    name: 'DetailLapangan',
    component: DetailLapangan,
    props: true,           // props:true supaya parameter id otomatis diterima sebagai prop
  },
  {
    path: '/detail-pembayaran/:id',
    name: 'DetailPembayaran',
    component: DetailPembayaran,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
