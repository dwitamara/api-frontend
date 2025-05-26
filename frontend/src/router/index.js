import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SewaLapangan from '../views/SewaLapangan.vue';
import Community from '../views/Community.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailLapangan from '../views/DetailLapangan.vue';
import DetailPembayaran from '../views/DetailPembayaran.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/sewa-lapangan', component: SewaLapangan },
  { path: '/community', component: Community },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/detail-lapangan', component: DetailLapangan },
  { path: '/detail-pembayaran', component: DetailPembayaran }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
