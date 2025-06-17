import { createRouter, createWebHistory } from 'vue-router';

// Umum
import Home from '../views/Home.vue';
import SewaLapangan from '../views/SewaLapangan.vue';
import Community from '../views/Community.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailLapangan from '../views/DetailLapangan.vue';
import DetailPembayaran from '../views/DetailPembayaran.vue';
import CariTemanBayar from '../views/CariTemanBayar.vue';
import Booking from '../views/Booking.vue';

// Admin
import AdminLogin from '../views/admin/Login.vue';
import AdminUsers from '../views/admin/Users.vue';
import AdminLapangan from '../views/admin/Lapangan.vue';
import AdminPemesanan from '../views/admin/Pemesanan.vue';

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
  path: '/cari-teman/:id',
  name: 'CariTemanBayar',
  component: () => import('@/views/CariTemanBayar.vue')
},
  {
  path: '/booking/:id',
  name: 'Booking',
  component: () => import('@/views/Booking.vue')
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
    props: true,
  },
  {
    path: '/detail-pembayaran/:id',
    name: 'DetailPembayaran',
    component: DetailPembayaran,
    props: true,
  },

  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
          {
    path: '/admin/Users',
    name: 'AdminUsers',
    component: AdminUsers,
  },
    {
    path: '/admin/lapangan',
    name: 'AdminLapangan',
    component: AdminLapangan,
  },
    {
    path: '/admin/pemesanan',
    name: 'AdminPemesanan',
    component: AdminPemesanan,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
