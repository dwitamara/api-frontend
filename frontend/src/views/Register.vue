<template>
  <div class="login-page">
    <div class="form-box">
      <div class="branding">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1976D2" width="48px" height="48px">
          <path d="M18 10V5H6v5H4v7h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-7h-2zm-8 0H8V7h2v3zm6 0h-2V7h2v3z"/>
        </svg>
        <h2>SportVenue</h2>
      </div>

      <h3 class="login-title">Daftar Akun Baru</h3>

      <div class="input-group">
        <input type="text" placeholder=" " class="form-input" id="name">
        <label for="name">Nama</label>
        <span class="input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-9.9 1.7-9.9 5v2h19.8v-2c0-3.3-6.6-5-9.9-5z"/>
          </svg>
        </span>
      </div>

      <div class="input-group">
        <input type="email" placeholder=" " class="form-input" id="email">
        <label for="email">Email</label>
        <span class="input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </span>
      </div>

      <!-- PASSWORD FIELD -->
      <div class="input-group">
        <span class="input-icon">
          <!-- Gembok ikon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-10 0v3H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zM8 7a4 4 0 1 1 8 0v3H8V7z"/>
          </svg>
        </span>
        <input :type="showPassword ? 'text' : 'password'" placeholder=" " class="form-input" id="password">
        <label for="password">Password</label>
        <!-- Mata toggle di ujung kanan -->
        <span class="toggle-icon" @click="togglePassword">
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 11c-2 0-3.8-1.5-4-3.5.2-2 2-3.5 4-3.5s3.8 1.5 4 3.5c-.2 2-2 3.5-4 3.5z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zM12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.6 0 3 1.3 3 3s-1.4 3-3 3z"/>
          </svg>
        </span>
      </div>

      <!-- CONFIRM PASSWORD FIELD -->
      <div class="input-group">
        <span class="input-icon">
          <!-- Gembok ikon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-10 0v3H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zM8 7a4 4 0 1 1 8 0v3H8V7z"/>
          </svg>
        </span>
        <input :type="showConfirmPassword ? 'text' : 'password'" placeholder=" " class="form-input" id="confirmPassword">
        <label for="confirmPassword">Konfirmasi Password</label>
        <!-- Mata toggle di ujung kanan -->
        <span class="toggle-icon" @click="toggleConfirmPassword">
          <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 11c-2 0-3.8-1.5-4-3.5.2-2 2-3.5 4-3.5s3.8 1.5 4 3.5c-.2 2-2 3.5-4 3.5z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zM12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.6 0 3 1.3 3 3s-1.4 3-3 3z"/>
          </svg>
        </span>
      </div>

      <button class="submit-btn">
        <span>Daftar</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
          <path d="M10 17l5-5-5-5v10z"/>
        </svg>
      </button>

      <p class="register-link">Sudah punya akun? <router-link to="/login" class="login">Login</router-link>
      </p>
    </div>

    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  font-family: 'Segoe UI', sans-serif;
}

.form-box {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(25, 118, 210, 0.15);
  padding: 40px;
  width: 100%;
  max-width: 650px;
  position: relative;
  z-index: 1;
}

.branding {
  text-align: center;
  margin-bottom: 30px;
}

.branding h2 {
  color: #1976D2;
  margin-top: 10px;
  font-size: 1.8rem;
}

.login-title {
  color: #0d47a1;
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.4rem;
  font-weight: 600;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.toggle-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

    .toggle-password {
      position: absolute;
      right: 15px;
      top: 70%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #999;
      font-size: 1rem;
      z-index: 2;
    }

.form-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e3f2fd;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f5f9ff;
}

.form-input:focus {
  outline: none;
  border-color: #1976D2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

.input-group label {
  position: absolute;
  top: 15px;
  left: 45px;
  color: #64b5f6;
  transition: all 0.3s ease;
  pointer-events: none;
}

.form-input:focus + label,
.form-input:not(:placeholder-shown) + label {
  top: -10px;
  left: 35px;
  background: white;
  padding: 0 5px;
  font-size: 0.8rem;
  color: #1976D2;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  color: #555;
}

.custom-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  left: 0;
  top: 0;
  height: 20px;
  width: 20px;
  background-color: #e3f2fd;
  border-radius: 5px;
  transition: all 0.3s;
}

.remember-me:hover .checkmark {
  background-color: #bbdefb;
}

.custom-checkbox:checked ~ .checkmark {
  background-color: #1976D2;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox:checked ~ .checkmark:after {
  display: block;
}

.forgot-password {
  color: #1976D2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.forgot-password:hover {
  text-decoration: underline;
  color: #0d47a1;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(to right, #1976D2, #2196F3);
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.submit-btn:hover {
  background: linear-gradient(to right, #1565C0, #1976D2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

.register-link {
  margin-top: 20px;
  text-align: center;
  color: #555;
}

.register-link a {
  color: #1976D2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.register-link a:hover {
  text-decoration: underline;
  color: #0d47a1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(25, 118, 210, 0.1);
  z-index: 1;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  left: -50px;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  right: -100px;
}

@media (max-width: 480px) {
  .form-box {
    padding: 30px 20px;
  }
  
  .branding h2 {
    font-size: 1.5rem;
  }
  
  .login-title {
    font-size: 1.2rem;
  }
}
</style>