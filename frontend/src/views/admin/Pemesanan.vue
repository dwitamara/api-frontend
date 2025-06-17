<template>
  <div class="booking-page">
    <ResponsiveSidebar>
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1>Manajemen Booking</h1>
        </div>
        <!-- <button class="add-btn" @click="openAddModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Tambah Booking
        </button> -->
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card total">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ totalBookings }}</span>
            <span class="stat-label">Total Booking</span>
          </div>
        </div>

        <div class="stat-card pending">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ pendingBookings }}</span>
            <span class="stat-label">Pending</span>
          </div>
        </div>

        <div class="stat-card confirmed">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ confirmedBookings }}</span>
            <span class="stat-label">Terkonfirmasi</span>
          </div>
        </div>

        <div class="stat-card canceled">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ canceledBookings }}</span>
            <span class="stat-label">Dibatalkan</span>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="search-filter-section">
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5
            16 5.91 13.09 3 9.5 3S3 5.91 3 9.5
            5.91 16 9.5 16c1.61 0 3.09-.59
            4.23-1.57l.27.28v.79l5 4.99
            L20.49 19l-4.99-5zm-6 0C7.01 14
            5 11.99 5 9.5S7.01 5 9.5 5
            14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari booking (ID, pengguna, lapangan...)"
            class="search-input"
          />
        </div>

        <div class="filter-section">
          <select v-model="statusFilter" class="filter-select">
            <option value="">Semua Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Terkonfirmasi</option>
            <option value="COMPLETED">Selesai</option>
            <option value="CANCELED">Dibatalkan</option>
          </select>

          <input
            type="date"
            v-model="dateFilter"
            class="filter-date"
            title="Filter berdasarkan tanggal"
          />

          <button class="refresh-btn" @click="refreshData" title="Refresh Data">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8
              c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6
              s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Memuat data booking...</p>
      </div>

      <!-- Bookings Table -->
      <div v-if="!loading" class="table-container">
        <table class="bookings-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Pengguna</th>
              <th>Lapangan</th>
              <th>Tanggal & Waktu</th>
              <th>Total Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(booking, index) in filteredBookings" :key="booking.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="user-info">
                  <div class="user-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1976d2">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div class="user-details">
                    <strong>{{ booking.user?.username || 'N/A' }}</strong>
                    <small>{{ booking.user?.email || 'N/A' }}</small>
                  </div>
                </div>
              </td>
              <td>
                <div class="user-details">
                  <strong>{{ booking.detailLapangan?.nama || 'N/A' }}</strong>
                  <small>{{ booking.detailLapangan?.tipeLapangan || 'N/A' }}</small>
                </div>
              </td>
              <td>
                <div class="user-details">
                  <strong>{{ formatDate(booking.tanggalBooking) }}</strong>
                  <small>{{ formatTime(booking.slotWaktu?.jamMulai) }} - {{ formatTime(booking.slotWaktu?.jamSelesai) }}</small>
                </div>
              </td>
              <td>
                <span class="price">{{ formatCurrency(booking.totalharga) }}</span>
              </td>
              <td>
                <span :class="['status-badge', booking.status?.toLowerCase()]">
                  {{ booking.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="view-btn" @click="viewBooking(booking)" title="Lihat Detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                  <button class="edit-btn" @click="editBooking(booking)" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <button class="delete-btn" @click="confirmDelete(booking)" title="Hapus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="filteredBookings.length === 0" class="no-data">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#ccc">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
          <p>Tidak ada data booking yang ditemukan</p>
        </div>
      </div>
    </ResponsiveSidebar>

    <!-- Modal Add/Edit Booking -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
  <div class="modal-content" @click.stop>
    <div class="modal-header">
      <h3>{{ isEditing ? 'Update Status Booking' : 'Tambah Booking Baru' }}</h3>
      <button class="close-btn" @click="closeModal">×</button>
    </div>

    <form @submit.prevent="saveBooking" class="modal-form">

      <!-- Form Booking Baru -->
      <template v-if="!isEditing">
        <div class="form-row">
          <div class="input-group">
            <label for="userId">Pengguna *</label>
            <select id="userId" v-model="formData.userId" class="form-input" required>
              <option value="">Pilih pengguna</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.username }} ({{ user.email }})
              </option>
            </select>
          </div>

          <div class="input-group">
            <label for="lapanganId">Lapangan *</label>
            <select id="lapanganId" v-model="formData.lapanganId" class="form-input" required @change="onLapanganChange">
              <option value="">Pilih lapangan</option>
              <option v-for="lapangan in lapanganList" :key="lapangan.id" :value="lapangan.id">
                {{ lapangan.nama }} - {{ lapangan.tipeLapangan }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label for="tanggalBooking">Tanggal Booking *</label>
            <input type="date" id="tanggalBooking" v-model="formData.tanggalBooking" class="form-input" :min="minDate" required>
          </div>

          <div class="input-group">
            <label for="slotWaktuId">Slot Waktu *</label>
            <select id="slotWaktuId" v-model="formData.slotWaktuId" class="form-input" required>
              <option value="">Pilih slot waktu</option>
              <option v-for="slot in availableSlots" :key="slot.id" :value="slot.id">
                {{ slot.jamMulai }} - {{ slot.jamSelesai }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label for="totalharga">Total Harga (Rp) *</label>
            <input type="number" id="totalharga" v-model="formData.totalharga" class="form-input" required>
          </div>

          <div class="input-group">
            <label>
              <input type="checkbox" v-model="formData.tersedia" class="form-checkbox">
              Booking Tersedia
            </label>
          </div>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label>
              <input type="checkbox" v-model="formData.isLookingForPartner" class="form-checkbox">
              Mencari Partner
            </label>
          </div>
        </div>
      </template>

      <!-- Field status (selalu tampil, editable hanya field ini saat edit) -->
      <div class="form-row">
        <div class="input-group">
          <label for="status">Status *</label>
          <select id="status" v-model="formData.status" class="form-input" required>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Terkonfirmasi</option>
            <option value="COMPLETED">Selesai</option>
            <option value="CANCELED">Dibatalkan</option>
          </select>
        </div>
      </div>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="closeModal">Batal</button>
        <button type="submit" class="save-btn" :disabled="saving">
          {{ saving ? 'Menyimpan...' : (isEditing ? 'Update Status' : 'Simpan') }}
        </button>
      </div>
    </form>
  </div>
</div>


    <!-- Modal View Detail Booking -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeViewModal">
      <div class="modal-content view-modal" @click.stop>
        <div class="modal-header">
          <h3>Detail Booking</h3>
          <button class="close-btn" @click="closeViewModal">×</button>
        </div>
        
        <div class="view-content" v-if="selectedBooking">
          <div class="booking-header">
            <div class="detail-item">
              <strong>ID Booking: {{ selectedBooking.id }}</strong>
            </div>
            <span :class="['status-badge', selectedBooking.status?.toLowerCase()]">
              {{ selectedBooking.status }}
            </span>
          </div>
          
          <div class="view-details">
            <div class="detail-item">
              <h4>Informasi Pengguna</h4>
              <div class="detail-item">
                <label>Username:</label>
                <span>{{ selectedBooking.user?.username || 'N/A' }}</span>
              </div>
              <div class="detail-item">
                <label>Email:</label>
                <span>{{ selectedBooking.user?.email || 'N/A' }}</span>
              </div>
            </div>

            <div class="detail-item">
              <h4>Informasi Lapangan</h4>
              <div class="detail-item">
                <label>Nama Lapangan:</label>
                <span>{{ selectedBooking.detailLapangan?.nama || 'N/A' }}</span>
              </div>
              <div class="detail-item">
                <label>Jenis Lapangan:</label>
                <span>{{ selectedBooking.detailLapangan?.tipeLapangan || 'N/A' }}</span>
              </div>
            </div>

            <div class="detail-item">
              <h4>Informasi Booking</h4>
              <div class="detail-item">
                <label>Tanggal Booking:</label>
                <span>{{ formatDate(selectedBooking.tanggalBooking) }}</span>
              </div>
              <div class="detail-item">
                <label>Waktu:</label>
                <span>{{ formatTime(selectedBooking.slotWaktu?.jamMulai) }} - {{ formatTime(selectedBooking.slotWaktu?.jamSelesai) }}</span>
              </div>
              <div class="detail-item">
                <label>Total Harga:</label>
                <span class="price-detail">{{ formatCurrency(selectedBooking.totalharga) }}</span>
              </div>
              <div class="detail-item">
                <label>Tersedia:</label>
                <span>{{ selectedBooking.tersedia ? 'Ya' : 'Tidak' }}</span>
              </div>
              <div class="detail-item">
                <label>Mencari Partner:</label>
                <span>{{ selectedBooking.isLookingForPartner ? 'Ya' : 'Tidak' }}</span>
              </div>
              <div class="detail-item">
                <label>Dibuat pada:</label>
                <span>{{ formatDateTime(selectedBooking.createdAt) }}</span>
              </div>
              <div class="detail-item" v-if="selectedBooking.updatedAt">
                <label>Diperbarui pada:</label>
                <span>{{ formatDateTime(selectedBooking.updatedAt) }}</span>
              </div>
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
  name: 'BookingManagement',
  components: {
    ResponsiveSidebar
  },
  data() {
    return {
      loading: false,
      saving: false,
      searchQuery: '',
      statusFilter: '',
      dateFilter: '',
      showModal: false,
      showViewModal: false,
      isEditing: false,
      selectedBooking: null,
      bookings: [],
      users: [],
      lapanganList: [],
      availableSlots: [],
      formData: {
        id: '',
        userId: '',
        lapanganId: '',
        slotWaktuId: '',
        tanggalBooking: '',
        totalharga: 0,
        status: 'PENDING',
        tersedia: true,
        isLookingForPartner: false
      }
    };
  },
  computed: {
    filteredBookings() {
      let filtered = this.bookings;

      // Filter berdasarkan search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(booking =>
          booking.user?.username?.toLowerCase().includes(query) ||
          booking.user?.email?.toLowerCase().includes(query) ||
          booking.detailLapangan?.nama?.toLowerCase().includes(query) ||
          booking.id.toLowerCase().includes(query)
        );
      }

      // Filter berdasarkan status
      if (this.statusFilter) {
        filtered = filtered.filter(booking => booking.status === this.statusFilter);
      }

      // Filter berdasarkan tanggal
      if (this.dateFilter) {
        const filterDate = new Date(this.dateFilter).toDateString();
        filtered = filtered.filter(booking => 
          new Date(booking.tanggalBooking).toDateString() === filterDate
        );
      }

      return filtered;
    },
    totalBookings() {
      return this.bookings.length;
    },
    confirmedBookings() {
      return this.bookings.filter(booking => booking.status === 'CONFIRMED').length;
    },
    pendingBookings() {
      return this.bookings.filter(booking => booking.status === 'PENDING').length;
    },
    canceledBookings() {
      return this.bookings.filter(booking => booking.status === 'CANCELED').length;
    },
    minDate() {
      // Set minimum date to today
      const today = new Date();
      return today.toISOString().split('T')[0];
    }
  },
  methods: {
    async fetchBookings() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/book', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.bookings = response.data.data;
        console.log('Data booking dari API:', response.data);
      } catch (error) {
        console.error('Gagal mengambil data booking:', error);
        alert('Gagal memuat data booking: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading = false;
      }
    },

    async fetchUsers() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/user/all-user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.users = response.data.data;
      } catch (error) {
        console.error('Gagal mengambil data users:', error);
      }
    },

    async fetchLapangan() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/lapangan', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.lapanganList = response.data.data;
      } catch (error) {
        console.error('Gagal mengambil data lapangan:', error);
      }
    },

    async fetchTimeSlots() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/waktu/all-waktu', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.availableSlots = response.data.data;
      } catch (error) {
        console.error('Gagal mengambil slot waktu:', error);
        this.availableSlots = [];
      }
    },

    async saveBooking() {
      this.saving = true;
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const dataToSend = {
          userId: this.formData.userId,
          lapanganId: this.formData.lapanganId,
          slotWaktuId: this.formData.slotWaktuId,
          tanggalBooking: this.formData.tanggalBooking,
          totalharga: parseInt(this.formData.totalharga),
          tersedia: this.formData.tersedia,
          isLookingForPartner: this.formData.isLookingForPartner
        };

        if (this.isEditing) {
          // Update existing booking - menggunakan endpoint updateBookingStatus
          await axios.put(`http://localhost:3000/book/update/${this.formData.id}`, 
            { status: this.formData.status }, 
            config
          );
          alert('Status booking berhasil diupdate!');
        } else {
          // Create new booking
          await axios.post('http://localhost:3000/book/create', dataToSend, config);
          alert('Booking baru berhasil ditambahkan!');
        }
        
        this.closeModal();
        await this.fetchBookings();
      } catch (error) {
        console.error('Error saving booking:', error);
        alert('Gagal menyimpan booking: ' + (error.response?.data?.message || error.message));
      } finally {
        this.saving = false;
      }
    },

    async updateStatus(bookingId, newStatus) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/booking/status/${bookingId}`, 
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        await this.fetchBookings();
        this.closeViewModal();
        alert(`Status booking berhasil diubah menjadi ${this.getStatusText(newStatus)}`);
      } catch (error) {
        console.error('Gagal mengubah status booking:', error);
        alert('Gagal mengubah status booking: ' + (error.response?.data?.message || error.message));
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    formatTime(timeValue) {
  if (!timeValue) return 'N/A';

  try {
    const date = new Date(timeValue);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    return 'Invalid time';
  }
},

   formatDateTime(dateString) {
      if (!dateString) return 'N/A';
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    formatCurrency(amount) {
      if (!amount) return 'Rp 0';
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount);
    },

    getStatusText(status) {
      const statusMap = {
        'PENDING': 'Pending',
        'CONFIRMED': 'Terkonfirmasi',
        'COMPLETED': 'Selesai',
        'CANCELED': 'Dibatalkan'
      };
      return statusMap[status] || status;
    },

    openAddModal() {
      this.isEditing = false;
      this.resetFormData();
      this.showModal = true;
    },

    editBooking(booking) {
      this.isEditing = true;
      this.formData = {
        id: booking.id,
        userId: booking.userId,
        lapanganId: booking.lapanganId,
        slotWaktuId: booking.slotWaktuId,
        tanggalBooking: booking.tanggalBooking ? booking.tanggalBooking.split('T')[0] : '',
        totalharga: booking.totalharga,
        status: booking.status,
        tersedia: booking.tersedia,
        isLookingForPartner: booking.isLookingForPartner
      };
      this.showModal = true;
    },

    viewBooking(booking) {
      this.selectedBooking = booking;
      this.showViewModal = true;
    },

    async confirmDelete(booking) {
      if (confirm(`Apakah Anda yakin ingin menghapus booking ini?\nID: ${booking.id}\nPengguna: ${booking.user?.username}`)) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3000/book/delete/${booking.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          alert('Booking berhasil dihapus!');
          await this.fetchBookings();
        } catch (error) {
          console.error('Gagal menghapus booking:', error);
          alert('Gagal menghapus booking: ' + (error.response?.data?.message || error.message));
        }
      }
    },

    closeModal() {
      this.showModal = false;
      this.resetFormData();
    },

    closeViewModal() {
      this.showViewModal = false;
      this.selectedBooking = null;
    },

    resetFormData() {
      this.formData = {
        id: '',
        userId: '',
        lapanganId: '',
        slotWaktuId: '',
        tanggalBooking: '',
        totalharga: 0,
        status: 'PENDING',
        tersedia: true,
        isLookingForPartner: false
      };
    },

    onLapanganChange() {
      // Reset slot waktu ketika lapangan berubah
      this.formData.slotWaktuId = '';
      // Bisa ditambahkan logic untuk filter slot berdasarkan lapangan jika diperlukan
    },

    refreshData() {
      this.fetchBookings();
      this.searchQuery = '';
      this.statusFilter = '';
      this.dateFilter = '';
    }
  },

  async mounted() {
    await Promise.all([
      this.fetchBookings(),
      this.fetchUsers(),
      this.fetchLapangan(),
      this.fetchTimeSlots()
    ]);
  }
};
</script>

<style scoped>
.booking-page {
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
  background: linear-gradient(to right, #43a047, #4caf50);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

/* Search and Filter Section */
.search-filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;
}

/* Search Box */
.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
  min-width: 250px;
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
  color: #666;
}

/* Filter Controls */
.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-select,
.filter-date {
  padding: 12px 15px;
  border: 2px solid #e3f2fd;
  border-radius: 10px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  transition: all 0.3s ease;
}

.filter-select:focus,
.filter-date:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

/* Refresh Button */
.refresh-btn {
  background-color: #1976d2;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.refresh-btn:hover {
  background-color: #125ea7;
}


/* Table */
.table-container {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
}

.bookings-table th {
  background: linear-gradient(to right, #1976d2, #2196f3);
  color: white;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
}

.bookings-table td {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  color: #333;
}

.bookings-table tr:hover {
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
  color: #1976d2;
  font-weight: bold;
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
/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* Setiap stat-card */
.stat-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  gap: 15px;
}

.stat-card:hover {
  transform: translateY(-4px);
}

/* Icon di dalam stat card */
.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}

/* Konten teks */
.stat-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
}

/* Warna berbeda tiap jenis stat */
.stat-card.total .stat-icon {
  background-color: #3b82f6; /* biru */
}

.stat-card.pending .stat-icon {
  background-color: #fbbf24; /* kuning */
}

.stat-card.confirmed .stat-icon {
  background-color: #10b981; /* hijau */
}

.stat-card.canceled .stat-icon {
  background-color: #ef4444; /* merah */
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .stat-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .stat-icon {
    margin-bottom: 10px;
  }
}

/* Status Badges */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-badge.pending {
  background: #fff3e0;
  color: #f57c00;
  border: 1px solid #ffcc02;
}

.status-badge.confirmed {
  background: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #4caf50;
}

.status-badge.canceled {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #f44336;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.view-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.view-btn:hover {
  background: #bbdefb;
  transform: translateY(-2px);
}

.edit-btn {
  background: #fff3e0;
  color: #f57c00;
}

.edit-btn:hover {
  background: #ffe0b2;
  transform: translateY(-2px);
}

.delete-btn {
  background: #ffebee;
  color: #f44336;
}

.delete-btn:hover {
  background: #ffcdd2;
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-state h3 {
  color: #999;
  margin-bottom: 10px;
}

.empty-state p {
  color: #bbb;
  font-size: 0.9rem;
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

.detail-item,
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

.status-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.status-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s;
}

.confirm-btn {
  background: #4caf50;
  color: white;
}

.confirm-btn:hover {
  background: #43a047;
  transform: translateY(-2px);
}

.cancel-status-btn {
  background: #f44336;
  color: white;
}

.cancel-status-btn:hover {
  background: #d32f2f;
  transform: translateY(-2px);
}

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
  .booking-page {
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
  
  .bookings-table {
    font-size: 13px;
  }
  
  .bookings-table th,
  .bookings-table td {
    padding: 12px 16px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
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
  
  .status-actions {
    flex-direction: column;
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
