<template>
  <div class="admin-user">
    <Sidebar />
    <main class="main-content">
      <div class="content-header">
        <h2>Kelola Users</h2>
        <p>Selamat datang di sistem manajemen!</p>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'AdminUsers',
  components: { Sidebar },
};
</script>

<style scoped>
.admin-user {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-color: #e3f2fd;
}

.main-content {
  margin-left: 240px;
  padding: 40px;
  flex: 1;
  overflow-y: auto;
  background-color: #e3f2fd;
}

.content-header h2 {
  color: #1e3a8a;
  margin-bottom: 10px;
}
</style>

