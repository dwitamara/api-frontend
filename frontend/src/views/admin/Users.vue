<!-- <template>
  <div>
    <Navbar />
    <div class="users-management">
      <h2>Kelola Pengguna</h2>
      
      <div class="toolbar">
        <button @click="refreshData" class="refresh-btn">
          <i class="fas fa-sync-alt"></i> Refresh
        </button>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Cari pengguna..." 
          class="search-input"
        >
      </div>
      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Nomor HP</th>
              <th>Tanggal Bergabung</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone || '-' }}</td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td class="actions">
                <button @click="confirmDelete(user)" class="delete-btn">
                  <i class="fas fa-trash-alt"></i> Hapus
                </button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="no-data">Tidak ada data pengguna</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  components: {Navbar},
  setup() {
    const users = ref([]);
    const searchQuery = ref('');

    // Ambil data dari API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        users.value = response.data;
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
        alert('Gagal memuat data pengguna');
      }
    };

    // Format tanggal
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Filter data berdasarkan pencarian
    const filteredUsers = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return users.value.filter(user => 
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.phone && user.phone.toLowerCase().includes(query))
      );
    });

    // Hapus user
    const confirmDelete = (user) => {
      if (confirm(`Apakah Anda yakin ingin menghapus ${user.username}?`)) {
        deleteUser(user.id);
      }
    };

    const deleteUser = async (userId) => {
      try {
        await axios.delete(`http://localhost:3000/user/users/${userId}`);
        await fetchUsers();
        alert('Pengguna berhasil dihapus');
      } catch (error) {
        console.error('Gagal menghapus pengguna:', error);
        alert('Gagal menghapus pengguna');
      }
    };

    // Refresh data
    const refreshData = () => {
      fetchUsers();
    };

    // Ambil data saat komponen dimuat
    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      searchQuery,
      filteredUsers,
      formatDate,
      confirmDelete,
      refreshData
    };
  }
};
</script>

<style scoped>
.users-management {
  padding: 20px;
  margin-left: 250px; /* Sesuaikan dengan lebar navbar */
}

h2 {
  color: #1e3a8a;
  margin-bottom: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.refresh-btn {
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-input {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #1e3a8a;
  color: white;
  position: sticky;
  top: 0;
}

tr:hover {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  gap: 5px;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .users-management {
    margin-left: 0;
    padding: 15px;
  }
  
  .toolbar {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  th, td {
    padding: 8px 10px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .users-management {
    padding: 10px;
  }
  
  h2 {
    font-size: 1.3rem;
  }
}
</style> -->

<template>
  <div class="users-page">
    <ResponsiveSidebar>
      <div class="page-header">
        <h1>Manajemen Pengguna</h1>
        <button class="refresh-btn" @click="refreshData">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">Add commentMore actions
            <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
          </svg>
          Refresh
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Memuat data pengguna...</p>
      </div>

      <!-- Stats Cards -->
      <div v-if="!loading" class="stats-container">
        <div class="stat-card">
          <div class="stat-icon" style="background: #e3f2fd;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.002 2.002 0 0 0 17.56 7H16c-.8 0-1.54.37-2.01.99l-2.54 3.33c-.74.97-.74 2.31 0 3.28L14.5 18H16v4h4zm-12.5 0v-7.5l-1.09-1.09A.996.996 0 0 0 5 13.5a1 1 0 0 0 1 1c.28 0 .53-.11.71-.29L8 15.5V22h3.5z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ totalUsers }}</h3>
            <p>Total Pengguna</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #e8f5e8;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4caf50">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ activeUsers }}</h3>
            <p>Pengguna Aktif</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #fff3e0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f57c00">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ recentUsers }}</h3>
            <p>Pengguna Baru (7 hari)</p>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div v-if="!loading" class="search-filter-section">
        <div class="search-box">
          <input 
            type="text"
            placeholder="Cari pengguna..."
            v-model="searchQuery"
            class="search-input"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#666" class="search-icon">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

      <!-- Users Table -->
      <div v-if="!loading" class="table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Informasi Pengguna</th>
              <th>Email</th>
              <th>Nomor HP</th>
              <th>Tanggal Bergabung</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="user-info">
                  <div class="user-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1976d2">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div class="user-details">
                    <strong>{{ user.username }}</strong>
                    <small>ID: {{ user.id }}</small>
                  </div>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.nomor || '-' }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>
                <span class="status-badge status-active">
                  Aktif
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="view-btn" @click="viewUser(user)" title="Lihat Detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg> Detail
                  </button>
                  <!-- <button class="delete-btn" @click="confirmDelete(user)" title="Hapus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="filteredUsers.length === 0" class="no-data">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#ccc">
            <path d="M12 2c-4 0-8 .5-8 4v8.5c0 4.5 8 5.5 8 5.5s8-1 8-5.5V6c0-3.5-4-4-8-4z"/>
          </svg>
          <p>Tidak ada data pengguna yang ditemukan</p>
        </div>
      </div>
    </ResponsiveSidebar>

    <!-- Modal View Detail User -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeViewModal">
      <div class="modal-content view-modal" @click.stop>
        <div class="modal-header">
          <h3>Detail Pengguna</h3>
          <button class="close-btn" @click="closeViewModal">×</button>
        </div>
        
        <div class="view-content" v-if="selectedUser">
          <div class="view-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          
          <div class="view-details">
            <div class="detail-item">
              <label>ID Pengguna:</label>
              <span>{{ selectedUser.id }}</span>
            </div>
            
            <div class="detail-item">
              <label>Username:</label>
              <span>{{ selectedUser.username }}</span>
            </div>
            
            <div class="detail-item">
              <label>Email:</label>
              <span>{{ selectedUser.email }}</span>
            </div>
            
            <div class="detail-item">
              <label>Nomor HP:</label>
              <span>{{ selectedUser.nomor || 'Tidak tersedia' }}</span>
            </div>
            
            <div class="detail-item">
              <label>Tanggal Bergabung:</label>
              <span>{{ formatDate(selectedUser.createdAt) }}</span>
            </div>
            
            <div class="detail-item">
              <label>Status:</label>
              <span class="status-badge status-active">Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResponsiveSidebar from '@/components/Sidebar.vue';
import axios from 'axios';

export default {
  name: 'UsersManagement',
  components: {
    ResponsiveSidebar
  },
  data() {
    return {
      loading: false,
      searchQuery: '',
      showViewModal: false,
      selectedUser: null,
      users: []
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.phone && user.phone.toLowerCase().includes(query))
      );
    },
    totalUsers() {
      return this.users.length;
    },
    activeUsers() {
      return this.users.length; // Assuming all users are active
    },
    recentUsers() {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return this.users.filter(user => new Date(user.created_at) >= sevenDaysAgo).length;
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get('http://localhost:3000/user/all-user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    localStorage.getItem('token');
    this.users = response.data.data;
    console.log('Data dari API:', response.data);
  } catch (error) {
    console.error('Gagal mengambil data pengguna:', error);
    alert('Gagal memuat data pengguna: ' + (error.response?.data?.message || error.message));
  } finally {
    this.loading = false;
  }
    },
    
    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    
    confirmDelete(user) {
      if (confirm(`Apakah Anda yakin ingin menghapus ${user.username}?`)) {
        this.deleteUser(user.id);
      }
    },
    
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:3000/user/users/${userId}`);
        await this.fetchUsers();
        alert('Pengguna berhasil dihapus');
      } catch (error) {
        console.error('Gagal menghapus pengguna:', error);
        alert('Gagal menghapus pengguna: ' + (error.response?.data?.message || error.message));
      }
    },
    
    viewUser(user) {
      this.selectedUser = user;
      this.showViewModal = true;
    },
    
    closeViewModal() {
      this.showViewModal = false;
      this.selectedUser = null;
    },
    
    refreshData() {
      this.fetchUsers();
    }
  },
  
  async mounted() {
    await this.fetchUsers();
  }
};
</script>

<style scoped>
.users-page {
  font-family: "Segoe UI", sans-serif;
  background-color: #f5f9ff;
  min-height: 100vh;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e3f2fd;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e3f2fd;
}

.page-header h1 {
  color: #0d47a1;
  font-size: 2rem;
  margin: 0;
}

.refresh-btn {
  background: linear-gradient(to right, #1976d2, #2196f3);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.refresh-btn:hover {
  background: linear-gradient(to right, #1565c0, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

/* Stats Cards */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info h3 {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.stat-info p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 0.9rem;
}

/* Search Section */
.search-filter-section {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e3f2fd;
  border-radius: 10px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}

/* Table */
.table-container {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  background: linear-gradient(to right, #1976d2, #2196f3);
  color: white;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
}

.users-table td {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  color: #333;
}

.users-table tr:hover {
  background-color: #f8f9ff;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details strong {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 2px;
}

.user-details small {
  color: #666;
  font-size: 0.8rem;
}

/* Status Badge */
.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-active {
  background-color: #e8f5e8;
  color: #2e7d32;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.view-btn, .delete-btn {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.view-btn {
  background-color: #e3f2fd;
  padding: 20px 40px;
  color: #1976d2;
}

.view-btn:hover {
  background-color: #1976d2;
  padding: 20px 40px;
  color: white;
}

.delete-btn {
  background-color: #ffebee;
  color: #d32f2f;
}

.delete-btn:hover {
  background-color: #d32f2f;
  color: white;
}

/* No Data */
.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-data svg {
  margin-bottom: 15px;
}

.no-data p {
  margin: 0;
  font-size: 1rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.view-content {
  padding: 25px;
}

.view-avatar {
  text-align: center;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9ff;
  border-radius: 10px;
}

.view-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item label {
  font-weight: 600;
  color: #555;
  min-width: 140px;
}

.detail-item span {
  color: #333;
  text-align: right;
  flex: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .search-filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
    color: #333;
  }
  
  .users-table th,
  .users-table td {
    padding: 10px;
    font-size: 0.9rem;
    color: #333;
  }
  
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .modal-content {
    margin: 20px;
    width: calc(100% - 40px);
  }
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .detail-item span {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .stat-info h3 {
    font-size: 1.5rem;
  }
}</style>