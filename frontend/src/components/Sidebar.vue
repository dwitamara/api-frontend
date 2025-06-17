<template>
  <!-- Hamburger Button (hanya muncul di mobile) -->
  <button class="hamburger-btn" @click="toggleSidebar" v-show="isMobile">
    ☰
  </button>

  <!-- Overlay untuk menutup sidebar ketika diklik di luar (hanya di mobile) -->
  <div class="sidebar-overlay" 
       v-show="isMobile && sidebarOpen" 
       @click="closeSidebar">
  </div>

  <!-- Sidebar -->
  <aside class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
    <div class="profile">
      <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=admin" alt="profile" />
      <div class="profile-info">
        <h3>{{ adminName }}</h3>
        <span>Admin</span>
      </div>
    </div>
    <nav class="nav-menu">
      <ul>
        <li><router-link to="/admin/users" @click="closeSidebar">Manajemen User</router-link></li>
        <li><router-link to="/admin/lapangan" @click="closeSidebar">Manajemen Lapangan</router-link></li>
      </ul>
    </nav>
    <button @click="logout" class="logout-button">Logout</button>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Konten utama Anda di sini -->
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'ResponsiveSidebar',
  data() {
    return {
      adminName: localStorage.getItem('adminName') || 'si_admin',
      sidebarOpen: false,
      isMobile: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = false;
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      // Di desktop, sidebar selalu terbuka
      if (!this.isMobile) {
        this.sidebarOpen = true;
      } else {
        this.sidebarOpen = false;
      }
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  width: 240px;
  background-color: #1e3a8a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
}

/* Hamburger Button */
.hamburger-btn {
  position: fixed;
  left: 15px;
  top: 15px;
  z-index: 1100;
  background: #1e3a8a;
  color: white;
  border: none;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: none; /* Sembunyikan di desktop */
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Main Content */
.main-content {
  /* margin-left: 240px; */
  padding: 20px;
  transition: margin-left 0.3s ease;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hamburger-btn {
    display: block; /* Tampilkan hanya di mobile */
  }
  
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
}

/* Profile Styles */
.profile {
  text-align: center;
  margin-bottom: 20px;
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

/* Navigation Menu */
.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin: 15px 0;
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

/* Logout Button */
.logout-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  margin-top: auto;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>