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
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
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
.admin-dashboard {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-color: #e3f2fd;
}

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