import { createRouter, createWebHistory } from 'vue-router';

// Umum
import Home from '../views/Home.vue';
import SewaLapangan from '../views/SewaLapangan.vue';
import Community from '../views/Community.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailLapangan from '../views/DetailLapangan.vue';
import DetailPembayaran from '../views/DetailPembayaran.vue';

// Admin
import AdminLogin from '../views/admin/Login.vue';
import AdminDashboard from '../views/admin/Dashboard.vue';
import AdminUsers from '../views/admin/Users.vue';
import AdminLapangan from '../views/admin/Lapangan.vue';

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

  // ===== Admin Routes =====
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
    {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
  },
    {
    path: '/admin/lapangan',
    name: 'AdminLapangan',
    component: AdminLapangan,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
