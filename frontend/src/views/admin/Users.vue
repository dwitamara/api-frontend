<template>
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
import Sidebar from '@/components/Sidebar.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  components: {
    Navbar
  },
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
</style>