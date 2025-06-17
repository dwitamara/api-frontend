<template>
  <div class="booking-container" v-if="user">
    <h1>Pembayaran Penuh</h1>
    <p>Lapangan ID: {{ $route.params.id }}</p>
    <p>Jadwal: {{ jam }}</p>
    <p>Tanggal: {{ tanggal }}</p>
    <p v-if="harga">Total yang harus dibayar: <strong>Rp {{ harga.toLocaleString() }}</strong></p>
    <p v-else>Harga tidak tersedia</p>

    <button @click="lanjutPembayaran" class="btn-bayar">
      Lanjut ke Pembayaran
    </button>

    <div v-if="showQris" class="qris-wrapper">
      <p>Silakan scan QRIS berikut untuk membayar:</p>
      <img src="/qris.jpeg" alt="QRIS Pembayaran" class="qris-img" />
    </div>
  </div>

  <div v-else>
    <p>Silakan login terlebih dahulu...</p>
  </div>
</template>

<script>
export default {
  name: 'Booking',
  data() {
    return {
      user: null,
      harga: 0,
      showQris: false,
    };
  },
  computed: {
    tanggal() {
      return this.$route.query.tanggal;
    },
    jam() {
      return this.$route.query.jam;
    },
  },
  methods: {
    async lanjutPembayaran() {
      const [jamMulai, jamSelesai] = this.jam.split(' - ');
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:3000/api/booking/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lapanganId: this.$route.params.id,
            tanggalBooking: this.tanggal,
            jamMulai: `${this.tanggal}T${jamMulai}:00`,
            jamSelesai: `${this.tanggal}T${jamSelesai}:00`,
            tersedia: true,
            totalharga: this.harga,
          }),
        });

        const result = await res.json();

        if (res.ok) {
          alert('Booking berhasil, silakan lanjutkan pembayaran QRIS.');
          this.showQris = true;
        } else {
          alert('Gagal booking: ' + (result.message || 'Terjadi kesalahan'));
        }
      } catch (error) {
        console.error('Error saat booking:', error);
        alert('Terjadi kesalahan saat melakukan booking');
      }
    },

    cekLogin() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      } else {
        this.$router.push('/login');
      }
    },

    async ambilHarga() {
      const hargaDariQuery = parseInt(this.$route.query.harga);
      if (hargaDariQuery && !isNaN(hargaDariQuery)) {
        this.harga = hargaDariQuery;
      } else {
        try {
          const res = await fetch(`http://localhost:3000/api/lapangan/${this.$route.params.id}`);
          const data = await res.json();
          this.harga = data.harga;
        } catch (err) {
          console.error('Gagal ambil harga:', err);
        }
      }
    }
  },
  mounted() {
    this.cekLogin();
    this.ambilHarga();
  }
};
</script>

<style scoped>
.booking-container {
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 20px;
  color: #1976d2;
  font-weight: bold;
}

.btn-bayar {
  background-color: #1976d2;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}

.qris-wrapper {
  margin-top: 30px;
  text-align: center;
}

.qris-img {
  max-width: 300px;
  width: 100%;
  border-radius: 10px;
  border: 2px solid #1976d2;
}
</style>
