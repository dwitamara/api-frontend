<template>
  <aside class="sidebar">
    <div class="profile">
      <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=admin" alt="profile" />
      <div class="profile-info">
        <h3>{{ userName }}</h3>
        <span>Admin</span>
      </div>
    </div>
    <nav class="nav-menu">
      <ul>
        <li><router-link to="/admin/users">Kelola User</router-link></li>
        <li><router-link to="/admin/lapangan">Manajemen Lapangan</router-link></li>
      </ul>
    </nav>
    <button @click="logout" class="logout-button">Logout</button>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      adminName: localStorage.getItem('adminName') || 'si_admin',
    };
  },
    methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.showModal = false;
      this.$router.push("/login");
    }
  }
};
</script>


<style scoped>

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

.bottom-logout {
  margin-top: auto;
}

.bottom-logout a {
  color: #ffffffcc;
  text-decoration: none;
  font-weight: 500;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s;
}

.bottom-logout a:hover {
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
