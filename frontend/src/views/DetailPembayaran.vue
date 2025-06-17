<template>
  <div class="cari-teman-container">
    <h1>Pembayaran Penuh</h1>

    <p>
      <strong>Lapangan ID:</strong>
      <span class="highlight">{{ lapanganId }}</span>
    </p>

    <p>
      <strong>Jadwal:</strong>
      <span class="highlight">
        <template v-if="jadwal">
          {{ jadwal.jamMulai }} - {{ jadwal.jamSelesai }}
        </template>
        <template v-else>
          Tidak tersedia
        </template>
      </span>
    </p>

    <p>
      <strong>Tanggal:</strong>
      <span class="highlight">{{ tanggal || 'Tidak tersedia' }}</span>
    </p>

    <p>
      <strong>Total yang harus dibayar:</strong>
      <span class="highlight">Rp {{ Number(totalHarga).toLocaleString('id-ID') }}</span>
    </p>

    <!-- Tombol Bayar -->
    <button v-if="!showQRIS" @click="tampilkanQRIS" class="btn-bayar">
      Lanjut ke Pembayaran
    </button>

    <!-- QRIS dan Tombol Selesai -->
    <div v-if="showQRIS" class="qris-section">
      <img src="/qris.jpeg" alt="QRIS" class="qris-img" />
      <p>Setelah membayar, klik tombol di bawah ini</p>
      <button @click="selesaikanPembayaran" class="btn-selesai">
        Selesai
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BayarPenuh',
  data() {
    return {
      lapanganId: '',
      slotWaktuId: null,
      tanggal: '',
      totalHarga: 0,
      jadwal: null,
      showQRIS: false,
    };
  },
  async mounted() {
    this.lapanganId = this.$route.params.id;
    this.slotWaktuId = this.$route.query.slotWaktuId;
    this.tanggal = this.$route.query.tanggal;
    this.totalHarga = Number(this.$route.query.totalHarga);

    console.log('DEBUG slotWaktuId:', this.slotWaktuId); // bantu debug

    // Ambil data jadwal
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3000/waktu/${this.slotWaktuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const slot = response.data.data;

      const formatJam = (jamStr) => {
        const [jam, menit] = jamStr.split('.');
        return `${jam.padStart(2, '0')}:${menit.padStart(2, '0')}`;
      };

      this.jadwal = {
        jamMulai: formatJam(slot.jamMulai),
        jamSelesai: formatJam(slot.jamSelesai),
      };
    } catch (err) {
      console.error('❌ Gagal mengambil data slot waktu:', err.response?.data || err);
    }
  },
  methods: {
    tampilkanQRIS() {
      this.showQRIS = true;
    },
    async selesaikanPembayaran() {
      if (!this.lapanganId || !this.slotWaktuId || !this.tanggal || !this.totalHarga) {
        alert('Data booking tidak lengkap.');
        return;
      }

      const payload = {
        lapanganId: this.lapanganId,
        tanggalBooking: this.tanggal,
        slotWaktuId: this.slotWaktuId,
        totalharga: this.totalHarga,
        tersedia: true,
        isLookingForPartner: false, // karena bayar penuh
      };

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Silakan login terlebih dahulu.');
          this.$router.push('/login');
          return;
        }

        await axios.post('http://localhost:3000/book/create', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert('Booking berhasil! Silakan cek di halaman penyewaanmu.');
        this.$router.push('/sewa'); // arahkan ke halaman sewa
      } catch (err) {
        console.error('❌ Gagal booking:', err.response?.data || err);
        alert('Gagal booking: ' + (err.response?.data?.message || 'Terjadi kesalahan.'));
      }
    },
  },
};
</script>

<style scoped>
.cari-teman-container {
  background-color: #cce6ff;
  padding: 40px;
  border-radius: 10px;
  max-width: 500px;
  margin: 30px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 25px;
  font-size: 28px;
  color: #222;
}

p {
  margin: 12px 0;
  font-size: 18px;
}

.highlight {
  font-weight: bold;
  color: #0a53be;
}

.btn-bayar,
.btn-selesai {
  background-color: #2ecc71;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}

.qris-img {
  width: 250px;
  margin: 20px 0;
}

.qris-section {
  margin-top: 30px;
}
</style>
