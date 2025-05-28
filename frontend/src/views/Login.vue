<template>
  <div>
    <nav class="navbar">
      <h1>SportVenue</h1>
    </nav>

    <div class="login-page">
      <div class="form-box">
        <div class="branding">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1976D2" width="48px" height="48px">
            <path d="M18 10V5H6v5H4v7h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-7h-2zm-8 0H8V7h2v3zm6 0h-2V7h2v3z" />
          </svg>
          <h2>SportVenue</h2>
        </div>

        <h3 class="login-title">Masuk ke Akun Anda</h3>

        <div class="input-group">
          <input type="email" placeholder=" " class="form-input" id="email" v-model="form.email" autocomplete="email" />
          <label for="email">Email</label>
          <span class="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1976D2">
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </span>
        </div>

        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" placeholder=" " class="form-input" id="password"
            v-model="form.password" autocomplete="new-password" />
          <label for="password">Password</label>
          <span class="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
              <path
                d="M12 17a2 2 0 110-4 2 2 0 010 4zm6-7h-1V7a5 5 0 00-10 0v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-6-5a3 3 0 013 3v3H9V8a3 3 0 013-3z" />
            </svg>
          </span>
          <span class="toggle-icon" @click="togglePassword">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2"
              viewBox="0 0 24 24">
              <path
                d="M12 6a9.77 9.77 0 018.94 6 9.77 9.77 0 01-17.88 0A9.77 9.77 0 0112 6m0-2a11.77 11.77 0 00-11 8 11.77 11.77 0 0022 0 11.77 11.77 0 00-11-8zm0 5a3 3 0 013 3 3 3 0 01-3 3 3 3 0 010-6z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1976D2" viewBox="0 0 24 24">
              <path
                d="M12 6a9.77 9.77 0 018.94 6 9.77 9.77 0 01-1.56 2.4L20.3 17l-1.4 1.4-16-16L4.3 1.7l2.5 2.5A11.77 11.77 0 001 12a11.77 11.77 0 0022 0 11.6 11.6 0 00-3.3-6.8l2.5-2.5L20.3 1.7l-3.7 3.7A11.77 11.77 0 0012 4a11.77 11.77 0 00-2.4.3L12 6zM12 8a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3c0-.46.12-.89.33-1.26L12 8z" />
            </svg>
          </span>
        </div>

        <div class="options">
          <label class="remember-me">
            <input type="checkbox" class="custom-checkbox" />
            <span class="checkmark"></span>
            Ingat saya
          </label>
          <a href="#" class="forgot-password">Lupa password?</a>
        </div>

        <button class="submit-btn" @click="login">
            <span>Masuk</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M10 17l5-5-5-5v10z" />
            </svg>
          </button>


        <p class="register-link">
          Belum punya akun? <router-link to="/register" class="register">Register</router-link>
        </p>
      </div>

      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      rememberMe: false,
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      if (!this.form.email || !this.form.password) {
        alert("Email dan Password harus diisi");
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.form.email,
          password: this.form.password
        });
        if (response.status === 200 && response.data.accesToken) {
          localStorage.setItem('token', response.data.accesToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          alert("Login berhasil!");
          this.$router.push('/sewa-lapangan');
        } else {
          alert("Login gagal: " + (response.data.message || ''));
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(error.response?.data?.message || 'Terjadi kesalahan saat login.');
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/dashboard');
    }
  }
};
</script>


<style scoped>
/* Login Page */
.login-page {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* mulai dari atas */
  padding: 100px 20px 20px 20px;
  /* ruang atas untuk navbar 70px + ekstra */
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  font-family: "Segoe UI", sans-serif;
  z-index: 50;
}

/* Form Box */
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
  color: #FFC107;
  margin-top: 0;
  font-size: 1.8rem;
}

.login-title {
  color: #0d47a1;
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-weight: 600;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

.form-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e3f2fd;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f5f9ff;
  color: #666;
  /* WARNA TEXT DI INPUT ABU-ABU */
  box-sizing: border-box;
}

.form-input::placeholder {
  color: transparent;
  /* sembunyikan placeholder */
}

.form-input:focus {
  outline: none;
  border-color: #1976d2;
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

.form-input:focus+label,
.form-input:not(:placeholder-shown)+label {
  top: -10px;
  left: 35px;
  background: white;
  padding: 0 5px;
  font-size: 0.8rem;
  color: #1976d2;
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

.custom-checkbox:checked~.checkmark {
  background-color: #1976d2;
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

.custom-checkbox:checked~.checkmark:after {
  display: block;
}

.forgot-password {
  color: #1976d2;
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
  background: linear-gradient(to right, #1976d2, #2196f3);
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
  background: linear-gradient(to right, #1565c0, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

.register-link {
  margin-top: 20px;
  text-align: center;
  color: #555;
}

.register-link a {
  color: #1976d2;
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
  bottom: -150px;
  right: -150px;
}
</style>
