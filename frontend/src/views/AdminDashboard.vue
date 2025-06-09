<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <img src="https://via.placeholder.com/80" alt="profile" />
        <div class="profile-info">
          <h3>si_admin</h3>
          <span>Admin</span>
        </div>
      </div>
      <nav class="nav-menu">
        <ul>
          <li><a href="#"><i class="icon-user"></i> Kelola User</a></li>
          <li><a href="#"><i class="icon-field"></i> Manajemen Lapangan</a></li>
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
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f9f9;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background-color: #2e563c;
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
  color: #c8e6c9;
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-menu a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.bottom-settings {
  margin-top: auto;
}

.bottom-settings a {
  color: #ffffffcc;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
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
}

.content-header h2 {
  color: #2e563c;
  margin-bottom: 10px;
}
</style>
