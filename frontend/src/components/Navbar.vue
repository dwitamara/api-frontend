<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">LOGO</router-link>
      <div class="menu-items">
        <router-link to="/sewa-lapangan">Sewa Lapangan</router-link>
        <router-link to="/community">Community</router-link>
      </div>
      <div class="auth-buttons">
        <router-link to="/login" class="login">Login</router-link>
        <router-link to="/register" class="register">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #0d47a1;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  color: white;
  text-decoration: none;
}

.menu-items {
  display: flex;
  gap: 8rem;
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
</style>
