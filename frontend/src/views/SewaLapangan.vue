<template>
  <div class="sewa-container">
    <h1 class="judul">Pilih Lapangan</h1>
    <div class="lapangan-grid">
      <div v-for="lapangan in lapanganList" :key="lapangan.id" class="lapangan-card">
        <img :src="lapangan.linkGambar" alt="Foto Lapangan" class="lapangan-foto" />

        <div class="lapangan-info">
          <div class="nama-lapangan">{{ lapangan.nama }}</div>

          <div class="lapangan-meta">
            <span class="material-icons">location_on</span>
            {{ lapangan.alamat }}
          </div>

          <div class="lapangan-icons">
            <span class="material-icons">sports</span>
            {{ lapangan.tipeLapangan }}
          </div>

          <div class="harga">Mulai <span>Rp{{ lapangan.harga }}</span> /sesi</div>

          <router-link :to="`/detail-lapangan/${lapangan.id}`" class="btn-detail">
            Lihat Detail
            <span class="material-icons">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios'

export default {
  name: 'SewaLapangan',
  data() {
    return {
      lapanganList: []
    }
  },
  mounted() {
    this.fetchLapangan()
  },
  methods: {
    async fetchLapangan() {
      try {
        const response = await axios.get('http://localhost:3000/lapangan')
        this.lapanganList = response.data.data
      } catch (error) {
        console.error('Gagal mengambil data lapangan:', error)
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.sewa-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.judul {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #0d1a2d;
  margin-bottom: 30px;
}

.lapangan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
  justify-content: center;
}

.lapangan-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 440px;
  transition: all 0.3s ease-in-out;
}

.lapangan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
}

.lapangan-foto {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.lapangan-info {
  padding: 22px 18px;
  text-align: center;
}

.nama-lapangan {
  font-size: 20px;
  font-weight: 700;
  color: #0d47a1; /* Biru gelap login */
  margin-bottom: 14px;
}

.lapangan-meta,
.lapangan-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.material-icons {
  font-size: 18px;
  margin-right: 6px;
  color: #1976D2;
}

.harga {
  font-size: 16px;
  font-weight: 500;
  color: #222;
  margin-top: 14px;
}

.harga span {
  color: #f9a825; /* Warna kuning login */
  font-weight: 700;
}

/* Tombol "Lihat Detail" */
.btn-detail {
  display: inline-block;
  background: linear-gradient(to right, #1976D2, #42A5F5);
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.btn-detail .material-icons {
  font-size: 18px;
  vertical-align: middle;
  margin-left: 4px;
}
</style>