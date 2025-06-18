<template>
  <div class="page-wrapper">
    <div class="cari-teman-container">
      <h1 class="judul-pembayaran">Pembayaran Penuh</h1>

      <p><strong>Lapangan ID:</strong> <span class="highlight">{{ lapanganId }}</span></p>
      <p><strong>Jadwal:</strong> <span class="highlight">
        <template v-if="jadwal">
          {{ jadwal.jamMulai }} - {{ jadwal.jamSelesai }}
        </template>
        <template v-else>
          Tidak tersedia
        </template>
      </span></p>

      <p><strong>Tanggal:</strong> <span class="highlight">{{ tanggal || 'Tidak tersedia' }}</span></p>
      <p><strong>Total yang harus dibayar:</strong> <span class="highlight">
        <template v-if="harga">
          Rp {{ harga.toLocaleString('id-ID') }}
        </template>
        <template v-else>
          Tidak tersedia
        </template>
      </span></p>

      <button v-if="!showQRIS" @click="tampilkanQRIS" class="btn-bayar">Lanjut ke Pembayaran</button>

      <div v-if="showQRIS" class="qris-section">
        <img src="/qris.jpeg" alt="QRIS" class="qris-img" />
        <p>Setelah membayar, klik tombol di bawah ini</p>
        <div class="button-group">
          <button @click="selesaikanPembayaran" class="btn-selesai">Selesai</button>
          <button
            v-if="lapanganId && slotWaktuId && tanggal && harga"
            @click="bookingCariTeman"
            class="btn-cari">
            Cari Teman Bermain
          </button>
        </div>
      </div>
    </div>

    <!-- Tombol kembali di luar dan bawah container -->
    <div class="tombol-kembali-wrapper">
      <button @click="$router.go(-1)" class="btn-kembali">⬅ Kembali</button>
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
        isLookingForPartner: false, // Pembayaran penuh tanpa cari teman
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

        alert('Booking berhasil! Silakan hubungi nomor admin berikut untuk konfirmasi 0812345678910.');
        this.$router.push('/sewa-lapangan');
      } catch (err) {
        console.error('❌ Gagal booking:', err.response?.data || err);
        alert('Gagal booking: ' + (err.response?.data?.message || 'Terjadi kesalahan.'));
      }
    },
    async bookingCariTeman() {
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
        isLookingForPartner: true, // karena ingin cari teman
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

        alert('Berhasil bergabung! Kamu sekarang tampil di komunitas.');
        this.$router.push({
          name: 'Community',
          params: { id: this.lapanganId },
          query: {
            slotWaktuId: this.slotWaktuId,
            tanggal: this.tanggal,
          },
        });
      } catch (err) {
        console.error('❌ Gagal booking:', err.response?.data || err);
        alert('Gagal booking: ' + (err.response?.data?.message || 'Terjadi kesalahan.'));
      }
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  padding: 40px 16px;
}

.cari-teman-container {
  background-color: #e3f2fd;
  padding: 40px;
  border-radius: 16px;
  max-width: 640px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.tombol-kembali-wrapper {
  max-width: 640px;
  margin: 30px auto 0 auto;
  text-align: left;
}

.btn-kembali {
  padding: 10px 16px;
  background-color: transparent;
  color: #0d47a1;
  border: 2px solid #0d47a1;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-kembali:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

.btn-kembali:active {
  background-color: #1976d2;
  color: white;
}

.judul-pembayaran {
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(to right, #0d47a1, #42A5F5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 30px;
}

p {
  font-size: 18px;
  color: #0d47a1;
  margin: 12px 0;
}

.highlight {
  color: #1976d2;
  font-weight: 600;
}

.btn-bayar,
.btn-selesai,
.btn-cari {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-bayar {
  background: linear-gradient(to right, #1976d2, #42a5f5);
  color: white;
  box-shadow: 0 4px 10px rgba(25, 118, 210, 0.3);
}

.btn-bayar:hover,
.btn-selesai:hover,
.btn-cari:hover {
  opacity: 0.9;
}

.btn-selesai {
  background: linear-gradient(to right, #43a047, #66bb6a);
  color: white;
}

.btn-cari {
  background: linear-gradient(to right, #00bcd4, #26c6da);
  color: white;
}

.qris-img {
  margin-top: 20px;
  width: 240px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.qris-section {
  text-align: center;
  margin-top: 24px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
</style>
