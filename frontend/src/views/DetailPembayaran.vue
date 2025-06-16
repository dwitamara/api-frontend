<template>
  <div class="container">
    <h2>Detail Pembayaran</h2>

    <div v-if="loading" class="loading">Memuat data booking...</div>

    <div v-else-if="bookingData.length === 0">
      <p>Belum ada booking yang dilakukan.</p>
    </div>

    <div v-else>
      <div v-for="booking in bookingData" :key="booking.id" class="booking-card">
        <h3>{{ booking.detailLapangan.nama }}</h3>
        <p><strong>Alamat:</strong> {{ booking.detailLapangan.alamat }}</p>
        <p><strong>Tanggal:</strong> {{ formatTanggal(booking.tanggalBooking) }}</p>
        <p><strong>Jam:</strong> {{ formatJam(booking.jamMulai) }} - {{ formatJam(booking.jamSelesai) }}</p>
        <p><strong>Total Harga:</strong> Rp {{ booking.totalharga.toLocaleString() }}</p>
        <p><strong>Status:</strong> {{ booking.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetailPembayaran',
  data() {
    return {
      bookingData: [],
      loading: true,
    };
  },
  methods: {
    async fetchBooking() {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Pastikan ini diset saat login

        const res = await axios.get(`http://localhost:3000/book/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.bookingData = res.data.data;
      } catch (error) {
        console.error("Gagal ambil data booking:", error);
      } finally {
        this.loading = false;
      }
    },
    formatTanggal(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    formatJam(timeStr) {
      const jam = new Date(timeStr);
      return jam.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    },
  },
  mounted() {
    this.fetchBooking();
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
}
.loading {
  text-align: center;
  font-style: italic;
}
.booking-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1.2rem;
  background: #fff;
  border-radius: 5px;
}
</style>
