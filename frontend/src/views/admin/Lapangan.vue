<template>
  <div class="lapangan-page">
    <ResponsiveSidebar>
      <div class="page-header">
        <h1>Manajemen Lapangan</h1>
        <button class="add-btn" @click="openAddModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Tambah Lapangan
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Memuat data lapangan...</p>
      </div>

      <!-- Stats Cards -->
      <div v-if="!loading" class="stats-container">
        <div class="stat-card">
          <div class="stat-icon" style="background: #e3f2fd;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ totalLapangan }}</h3>
            <p>Total Lapangan</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #fff3e0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f57c00">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5l3.5 2.5-3.5 2.5L8.5 16l3.5-2.5z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ uniqueTypes }}</h3>
            <p>Jenis Lapangan</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #f3e5f5;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#7b1fa2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>Rp {{ averagePrice }}</h3>
            <p>Harga Rata-rata</p>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div v-if="!loading" class="search-filter-section">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Cari lapangan..." 
            v-model="searchQuery"
            class="search-input"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#666" class="search-icon">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        
        <select v-model="filterType" class="filter-select">
          <option value="">Semua Jenis</option>
          <option v-for="type in uniqueTypesArray" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <!-- Lapangan Table -->
      <div v-if="!loading" class="table-container">
        <table class="lapangan-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lapangan</th>
              <th>Jenis</th>
              <th>Alamat</th>
              <th>Harga/Jam</th>
              <th>No. Telepon</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lapangan, index) in filteredLapangan" :key="lapangan.id">
              <td class="address-info">{{ index + 1 }}</td>
              <td>
                <div class="field-info">
                  <strong>{{ lapangan.nama }}</strong>
                  <small v-if="lapangan.deskripsi">{{ truncateText(lapangan.deskripsi, 50) }}</small>
                </div>
              </td>
              <td>
                <span class="address-info" :class="getSportClass(lapangan.tipeLapangan)">
                  {{ lapangan.tipeLapangan }}
                </span>
              </td>
              <td>
                <div class="address-info">
                  {{ lapangan.alamat }}
                </div>
              </td>
              <td class="address-info">Rp {{ formatPrice(lapangan.harga) }}</td>
              <td class="address-info">{{ lapangan.noTelp }}</td>
              <td>
                <div class="action-buttons">
                  <button class="view-btn" @click="viewLapangan(lapangan)" title="Lihat Detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                  <button class="edit-btn" @click="editLapangan(lapangan)" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <button class="delete-btn" @click="deleteLapangan(lapangan.id)" title="Hapus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="filteredLapangan.length === 0" class="no-data">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#ccc">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p>Tidak ada data lapangan yang ditemukan</p>
        </div>
      </div>
    </ResponsiveSidebar>

    <!-- Modal Add/Edit Lapangan -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? 'Edit Lapangan' : 'Tambah Lapangan Baru' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        
        <form @submit.prevent="saveLapangan" class="modal-form">
          <div class="form-row">
            <div class="input-group">
              <label for="nama">Nama Lapangan *</label>
              <input 
                type="text" 
                id="nama"
                v-model="formData.nama" 
                class="form-input"
                placeholder="Masukkan nama lapangan"
                required
              >
            </div>
            
            <div class="input-group">
              <label for="tipeLapangan">Jenis Lapangan *</label>
              <select id="tipeLapangan" v-model="formData.tipeLapangan" class="form-input" required>
                <option value="">Pilih jenis lapangan</option>
                <option value="Futsal">Futsal</option>
                <option value="Badminton">Badminton</option>
                <option value="Basket">Basket</option>
                <option value="Voli">Voli</option>
                <option value="Tenis">Tenis</option>
                <option value="Mini Soccer">Mini Soccer</option>
                <option value="Sepak Takraw">Sepak Takraw</option>
              </select>
            </div>
          </div>

          <div class="input-group">
            <label for="alamat">Alamat Lapangan *</label>
            <textarea 
              id="alamat"
              v-model="formData.alamat" 
              class="form-input"
              placeholder="Masukkan alamat lengkap lapangan"
              rows="2"
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="input-group">
              <label for="harga">Harga per Jam (Rp) *</label>
              <input 
                type="number" 
                id="harga"
                v-model="formData.harga" 
                class="form-input"
                placeholder="Harga dalam rupiah"
                min="0"
                required
              >
            </div>
            
            <div class="input-group">
              <label for="noTelp">No. Telepon *</label>
              <input 
                type="tel" 
                id="noTelp"
                v-model="formData.noTelp" 
                class="form-input"
                placeholder="Contoh: 081234567890"
                required
              >
            </div>
          </div>

          <div class="input-group">
            <label for="linkGambar">Link Gambar</label>
            <input 
              type="url" 
              id="linkGambar"
              v-model="formData.linkGambar" 
              class="form-input"
              placeholder="https://example.com/gambar-lapangan.jpg"
            >
          </div>

          <div class="input-group">
            <label for="deskripsi">Deskripsi Lapangan</label>
            <textarea 
              id="deskripsi"
              v-model="formData.deskripsi" 
              class="form-input"
              placeholder="Deskripsi fasilitas dan keunggulan lapangan"
              rows="4"
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeModal">Batal</button>
            <button type="submit" class="save-btn" :disabled="saving">
              {{ saving ? 'Menyimpan...' : (isEditing ? 'Update' : 'Simpan') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal View Detail -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeViewModal">
      <div class="modal-content view-modal" @click.stop>
        <div class="modal-header">
          <h3>Detail Lapangan</h3>
          <button class="close-btn" @click="closeViewModal">×</button>
        </div>
        
        <div class="view-content" v-if="selectedLapangan">
          <div class="view-image" v-if="selectedLapangan.linkGambar">
            <img :src="selectedLapangan.linkGambar" :alt="selectedLapangan.nama" @error="handleImageError">
          </div>
          
          <div class="view-details">
            <div class="detail-item">
              <label>Nama Lapangan:</label>
              <span>{{ selectedLapangan.nama }}</span>
            </div>
            
            <div class="detail-item">
              <label>Jenis Lapangan:</label>
              <span class="sport-tag" :class="getSportClass(selectedLapangan.tipeLapangan)">
                {{ selectedLapangan.tipeLapangan }}
              </span>
            </div>
            
            <div class="detail-item">
              <label>Alamat:</label>
              <span>{{ selectedLapangan.alamat }}</span>
            </div>
            
            <div class="detail-item">
              <label>Harga per Jam:</label>
              <span class="price-highlight">Rp {{ formatPrice(selectedLapangan.harga) }}</span>
            </div>
            
            <div class="detail-item">
              <label>No. Telepon:</label>
              <span>{{ selectedLapangan.noTelp }}</span>
            </div>
            
            <div class="detail-item" v-if="selectedLapangan.deskripsi">
              <label>Deskripsi:</label>
              <p>{{ selectedLapangan.deskripsi }}</p>
            </div>
            
            <div class="detail-item">
              <label>Dibuat pada:</label>
              <span>{{ formatDate(selectedLapangan.createdAt) }}</span>
            </div>
            
            <div class="detail-item" v-if="selectedLapangan.updatedAt">
              <label>Terakhir diupdate:</label>
              <span>{{ formatDate(selectedLapangan.updatedAt) }}</span>
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
  name: 'LapanganManagement',
  components: {
    ResponsiveSidebar
  },
  data() {
    return {
      loading: false,
      saving: false,
      searchQuery: '',
      filterType: '',
      showModal: false,
      showViewModal: false,
      isEditing: false,
      selectedLapangan: null,
      formData: {
        nama: '',
        alamat: '',
        harga: '',
        tipeLapangan: '',
        linkGambar: '',
        noTelp: '',
        deskripsi: ''
      },
      lapanganList: []
    };
  },
  computed: {
    filteredLapangan() {
      let filtered = this.lapanganList;
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(lapangan => 
          lapangan.nama.toLowerCase().includes(query) ||
          lapangan.tipeLapangan.toLowerCase().includes(query) ||
          lapangan.alamat.toLowerCase().includes(query) ||
          lapangan.deskripsi.toLowerCase().includes(query)
        );
      }
      
      if (this.filterType) {
        filtered = filtered.filter(lapangan => lapangan.tipeLapangan === this.filterType);
      }
      
      return filtered;
    },
    totalLapangan() {
      return this.lapanganList.length;
    },
    uniqueTypes() {
      return new Set(this.lapanganList.map(l => l.tipeLapangan)).size;
    },
    uniqueTypesArray() {
      return [...new Set(this.lapanganList.map(l => l.tipeLapangan))].sort();
    },
    averagePrice() {
      if (this.lapanganList.length === 0) return '0';
      const total = this.lapanganList.reduce((sum, l) => sum + l.harga, 0);
      const avg = total / this.lapanganList.length;
      return this.formatPrice(avg);
    }
  },
  methods: {
    async fetchLapangan() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/lapangan', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.lapanganList = response.data.data;
        console.log('Response lapangan:', response.data); 
      } catch (error) {
        console.error('Error fetching lapangan:', error);
        alert('Gagal memuat data lapangan: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading = false;
      }
    },

    async saveLapangan() {
      this.saving = true;
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        // Konversi harga ke integer
        const dataToSend = {
          ...this.formData,
          harga: parseInt(this.formData.harga)
        };

        if (this.isEditing) {
          // Update existing lapangan
          await axios.put(`http://localhost:3000/lapangan/${this.formData.id}`, dataToSend, config);
          alert('Lapangan berhasil diupdate!');
        } else {
          // Create new lapangan
          await axios.post('http://localhost:3000/lapangan', dataToSend, config);
          alert('Lapangan baru berhasil ditambahkan!');
        }
        
        this.closeModal();
        await this.fetchLapangan(); // Refresh data
      } catch (error) {
        console.error('Error saving lapangan:', error);
        alert('Gagal menyimpan lapangan: ' + (error.response?.data?.message || error.message));
      } finally {
        this.saving = false;
      }
    },

    async deleteLapangan(id) {
      if (!confirm('Apakah Anda yakin ingin menghapus lapangan ini?')) {
        return;
      }

      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/lapangan/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        alert('Lapangan berhasil dihapus!');
        await this.fetchLapangan(); // Refresh data
      } catch (error) {
        console.error('Error deleting lapangan:', error);
        alert('Gagal menghapus lapangan: ' + (error.response?.data?.message || error.message));
      }
    },

    openAddModal() {
      this.isEditing = false;
      this.resetForm();
      this.showModal = true;
    },
    
    editLapangan(lapangan) {
      this.isEditing = true;
      this.formData = { ...lapangan };
      this.showModal = true;
    },

    viewLapangan(lapangan) {
      this.selectedLapangan = lapangan;
      this.showViewModal = true;
    },
    
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },

    closeViewModal() {
      this.showViewModal = false;
      this.selectedLapangan = null;
    },
    
    resetForm() {
      this.formData = {
        id: '',
        nama: '',
        alamat: '',
        harga: '',
        tipeLapangan: '',
        linkGambar: '',
        noTelp: '',
        deskripsi: ''
      };
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price);
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

    truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/400x200/f0f0f0/666?text=Gambar+Tidak+Tersedia';
    },
    
    getSportClass(sport) {
      const classes = {
        'Futsal': 'sport-futsal',
        'Badminton': 'sport-badminton',
        'Basket': 'sport-basket',
        'Voli': 'sport-voli',
        'Tenis': 'sport-tenis',
        'Mini Soccer': 'sport-soccer',
        'Sepak Takraw': 'sport-takraw'
      };
      return classes[sport] || 'sport-default';
    }
  },
  async mounted() {
    // Check if user is logged in and has admin role
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'Admin') {
      alert('Akses ditolak. Anda harus login sebagai admin.');
      this.$router.push('/admin/login');
      return;
    }

    await this.fetchLapangan();
  }
};
</script>

<style scoped>
.lapangan-page {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f9ff;
  min-height: 100vh;
  padding: 20px;
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
  font-weight: 700;
}

.add-btn {
  background: linear-gradient(135deg, #1976d2, #2196f3);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.add-btn:hover {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(25, 118, 210, 0.4);
}

/* Stats Cards */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1976d2, #2196f3);
  color: white;
  font-size: 24px;
}

.stat-info h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  line-height: 1.2;
}

.stat-info p {
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

/* Search and Filter */
.search-filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 280px;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 14px 18px 14px 50px;
  border: 2px solid #e8f2ff;
  border-radius: 12px;
  font-size: 14px;
  background-color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  font-weight: 400;
}

.search-input:focus {
  outline: none;
  color: #333;
  border-color: #1976d2;
  box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.15);
  background-color: #fafbff;
}

.search-input::placeholder {
  color: #333;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9e9e9e;
  font-size: 18px;
}

.filter-select {
  padding: 10px 18px; /* kurangi padding vertikal biar gak terlalu tinggi */
  border: 2px solid #e8f2ff;
  border-radius: 12px;
  background-color: white;
  color: #333333; /* warna teks hitam gelap */
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 150px;
  line-height: 1.4; /* agar teks lebih rapi */
  appearance: none; /* hilangkan default arrow jika ingin custom */
  -webkit-appearance: none;
  -moz-appearance: none;
}

.filter-select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.15);
}


/* Table */
.table-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.lapangan-table {
  width: 100%;
  border-collapse: collapse;
}

.lapangan-table th {
  background: linear-gradient(135deg, #1976d2, #2196f3);
  color: white;
  padding: 20px 24px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lapangan-table td {
  padding: 20px 24px;
  border-bottom: 1px solid #f5f5f5;
  vertical-align: middle;
}

.lapangan-table tr:hover {
  background-color: #f8fbff;
}

.field-info strong {
  display: block;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
}

.field-info small {
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}

.address-info {
  max-width: 220px;
  line-height: 1.5;
  color: #555;
  font-size: 13px;
}

.no-data {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 16px;
}

/* ============= MODAL STYLES ============= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px 20px 30px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #f8fbff, #ffffff);
}

.modal-header h3 {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #666;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.close-btn:hover {
  background: #e3f2fd;
  color: #1976d2;
  transform: scale(1.05);
}

/* Modal Form Styles */
.modal-form {
  padding: 30px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.input-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
  letter-spacing: 0.2px;
}

.form-input {
  padding: 14px 16px;
  border: 2px solid #e8f2ff;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  background-color: white;
  color: #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.15);
  background-color: white;
  color: #1a1a1a;
}

.form-input::placeholder {
  color: #9e9e9e;
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  line-height: 1.5;
}

select.form-input {
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%23666" d="M6 8L2 4h8z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center;
  appearance: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.cancel-btn {
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cancel-btn:hover {
  border-color: #bdbdbd;
  background: #f5f5f5;
  color: #333;
}

.save-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #1976d2, #2196f3);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.save-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(25, 118, 210, 0.4);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Modal View Detail Styles */
.view-modal {
  max-width: 700px;
}

.view-content {
  padding: 30px;
}

.view-image {
  margin-bottom: 30px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.view-image img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.view-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item label {
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item span,
.detail-item p {
  color: #1a1a1a;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.price-highlight {
  color: #27ae60;
  font-weight: 700;
  font-size: 18px;
}

.sport-tag {
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  color: #1976d2;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border: 1px solid rgba(25, 118, 210, 0.2);
}

/* Sport-specific colors */
.sport-tag.futsal { background: linear-gradient(135deg, #e8f5e8, #f1f8e9); color: #2e7d32; border-color: rgba(46, 125, 50, 0.2); }
.sport-tag.badminton { background: linear-gradient(135deg, #fff3e0, #fef7ed); color: #f57c00; border-color: rgba(245, 124, 0, 0.2); }
.sport-tag.basket { background: linear-gradient(135deg, #fce4ec, #fdf2f8); color: #c2185b; border-color: rgba(194, 24, 91, 0.2); }
.sport-tag.voli { background: linear-gradient(135deg, #f3e5f5, #faf5ff); color: #7b1fa2; border-color: rgba(123, 31, 162, 0.2); }
.sport-tag.tenis { background: linear-gradient(135deg, #e0f2f1, #f0fdfa); color: #00695c; border-color: rgba(0, 105, 92, 0.2); }

/* Animations */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .lapangan-page {
    padding: 15px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .search-filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .modal-content {
    margin: 10px;
    max-width: none;
    width: calc(100% - 20px);
  }
  
  .modal-header {
    padding: 20px 20px 15px 20px;
  }
  
  .modal-header h3 {
    font-size: 20px;
  }
  
  .modal-form,
  .view-content {
    padding: 20px;
  }
  
  .modal-actions {
    flex-direction: column-reverse;
  }
  
  .cancel-btn,
  .save-btn {
    width: 100%;
    justify-content: center;
  }
  
  .lapangan-table {
    font-size: 13px;
  }
  
  .lapangan-table th,
  .lapangan-table td {
    padding: 12px 16px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .stat-info h3 {
    font-size: 1.5rem;
  }
}

/* Scrollbar Styling */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Focus styles for accessibility */
.form-input:focus,
.cancel-btn:focus,
.save-btn:focus,
.close-btn:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
</style>
