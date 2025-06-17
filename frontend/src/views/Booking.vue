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
      <span class="highlight">
        <template v-if="harga">
          Rp {{ harga.toLocaleString('id-ID') }}
        </template>
        <template v-else>
          Tidak tersedia
        </template>
      </span>
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
      harga: null,
      jadwal: null,
      showQRIS: false,
    };
  },
  async mounted() {
    this.lapanganId = this.$route.params.id;
    this.slotWaktuId = this.$route.query.slotWaktuId;
    this.tanggal = this.$route.query.tanggal;

    await this.ambilHarga();
    await this.ambilJadwal();
  },
  methods: {
    async ambilHarga() {
      const hargaDariQuery = parseInt(this.$route.query.harga);
      if (hargaDariQuery && !isNaN(hargaDariQuery)) {
        this.harga = hargaDariQuery;
      } else {
        try {
          const res = await fetch(`http://localhost:3000/api/lapangan/${this.lapanganId}`);
          const data = await res.json();
          this.harga = data.harga;
        } catch (err) {
          console.error('Gagal ambil harga:', err);
        }
      }
    },
    async ambilJadwal() {
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
    tampilkanQRIS() {
      this.showQRIS = true;
    },
    async selesaikanPembayaran() {
      if (!this.lapanganId || !this.slotWaktuId || !this.tanggal || !this.harga) {
        alert('Data booking tidak lengkap.');
        return;
      }

      const payload = {
        lapanganId: this.lapanganId,
        tanggalBooking: this.tanggal,
        slotWaktuId: this.slotWaktuId,
        totalharga: this.harga,
        tersedia: true,
        isLookingForPartner: false, // karena pembayaran penuh
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
        this.$router.push('/sewa');
      } catch (err) {
        console.error('❌ Gagal booking:', err.response?.data || err);
        alert('Gagal booking: ' + (err.response?.data?.message || 'Terjadi kesalahan.'));
      }
    },
  },
};
</script>

<style scoped>
.highlight {
  color: #1e88e5;
  font-weight: bold;
}
.btn-bayar,
.btn-selesai {
  margin-top: 16px;
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.qris-img {
  margin-top: 16px;
  width: 200px;
}
.qris-section {
  text-align: center;
}
</style>