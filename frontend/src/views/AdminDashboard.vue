<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=admin" alt="profile" />
        <div class="profile-info">
          <h3>{{ adminName }}</h3>
          <span>Admin</span>
        </div>
      </div>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/admin/users">Kelola User</router-link></li>
          <li><a href="#">Manajemen Lapangan</a></li>
        </ul>
      </nav>
      <div class="bottom-settings">
        <a href="#"><i class="icon-settings"></i> Settings</a>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-header">
        <h2>Dashboard Admin</h2>
        <p>Selamat datang di sistem manajemen!</p>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      adminName: localStorage.getItem('adminName') || 'si_admin',
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-color: #e3f2fd;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background-color: #1e3a8a; /* biru gelap */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.profile {
  text-align: center;
}

.profile img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.profile-info h3 {
  font-size: 1.1rem;
  margin: 0;
}

.profile-info span {
  font-size: 0.9rem;
  color: #cfd8dc;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

.nav-menu li {
  margin: 20px 0;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: block;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.bottom-settings {
  margin-top: auto;
}

.bottom-settings a {
  color: #ffffffcc;
  text-decoration: none;
  font-weight: 500;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s;
}

.bottom-settings a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Main Content */
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
