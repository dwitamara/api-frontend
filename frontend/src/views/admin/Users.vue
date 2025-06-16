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

      <!-- Tempat router-view -->
      <router-view></router-view>
    </div> <!-- Penutup .users-management -->
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  setup() {
    const users = ref([]);
    const searchQuery = ref('');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        users.value = response.data;
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
        alert('Gagal memuat data pengguna');
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const filteredUsers = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return users.value.filter(user => 
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.phone && user.phone.toLowerCase().includes(query))
      );
    });

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

    const refreshData = () => {
      fetchUsers();
    };

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
  padding: 40px;
  background-color: #e3f2fd;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.refresh-btn {
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
