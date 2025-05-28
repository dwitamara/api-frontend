<template>
  <nav class="navbar" v-if="isReady">
    <div class="navbar-container">
      <router-link to="/" class="logo">SportVenue</router-link>
      <div class="menu-items">
        <router-link to="/sewa-lapangan">Sewa Lapangan</router-link>
        <router-link to="/community">Community</router-link>
      </div>

      <div class="auth-buttons">
        <div v-if="isLoggedIn" class="user-info" @click="toggleModal">
          <!-- Ganti src avatar -->
<img class="avatar" src="https://api.dicebear.com/7.x/thumbs/svg?seed=character" alt="avatar" />
          <span class="username">Welcome, {{ user.username }}</span>
        </div>

        <template v-else>
          <router-link to="/login" class="login">Login</router-link>
          <router-link to="/register" class="register">Register</router-link>
        </template>
      </div>
    </div>

    <!-- Modal Info User -->
    <div v-if="showModal" class="modal-overlay" @click.self="toggleModal">
      <div class="modal-content">
        <h2>Informasi Akun</h2>
        <div class="user-details">
          <p><strong>Nama:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Nomor Telepon:</strong> {{ user.nomor }}</p>
        </div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      user: {},
      showModal: false,
      isReady: false, // Tambahan untuk mencegah flicker
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    }
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      this.isLoggedIn = !!token && !!userData;
      this.user = userData ? JSON.parse(userData) : {};
      this.isReady = true; // Menandakan data siap ditampilkan
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.showModal = false;
      this.$router.push("/login");
    },
    toggleModal() {
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #0d47a1;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #FFC107;
  text-decoration: none;
}

.menu-items {
  display: flex;
  gap: 4rem;
}

.menu-items a {
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
}

.menu-items a.router-link-exact-active {
  border-bottom: 2px solid #90caf9;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.login, .register {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
}

.login {
  background: transparent;
  border: 1px solid #90caf9;
  color: #90caf9;
}

.login:hover {
  background-color: rgba(144, 202, 249, 0.1);
}

.register {
  background-color: #90caf9;
  color: #0d47a1;
}

.register:hover {
  background-color: #64b5f6;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
}

.username {
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* Modal Content */
.modal-content {
  background: #fff;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  text-align: left;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  animation: fadeIn 0.3s ease;
}

/* Animasi lembut */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Judul */
.modal-content h2 {
  margin-top: 0;
  font-size: 1.8rem;
  color: #0d47a1;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
}

/* Isi paragraf */
.modal-content p {
  margin: 0.75rem 0;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

.modal-content strong {
  color: #0d47a1;
  font-weight: 600;
}

/* Tombol Logout */
.logout-button {
  margin-top: 2rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.7rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #b71c1c;
}

</style>
