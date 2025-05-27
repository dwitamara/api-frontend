<template>
  <div class="sewa-container">
    <h1>Pilih Lapangan</h1>
    <div class="lapangan-grid">
      <div v-for="lapangan in lapanganList" :key="lapangan.id" class="lapangan-card">
        <img :src="lapangan.foto" alt="Foto Lapangan" class="lapangan-foto" />
        <div class="lapangan-info">
          <h2>{{ lapangan.nama }}</h2>
          <div class="lapangan-meta">
            <span class="rating">⭐ {{ lapangan.rating }}</span>
            <span class="lokasi">• {{ lapangan.lokasi }}</span>
          </div>
          <div class="lapangan-icons">
            <span v-for="jenis in lapangan.jenis" :key="jenis" class="jenis-icon">🏟 {{ jenis }}</span>
          </div>
          <p class="harga">Mulai <strong>Rp{{ lapangan.harga.toLocaleString() }}</strong> /sesi</p>
          <router-link :to="`/detail-lapangan/${lapangan.id}`" class="btn-lihat">Lihat Detail</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GORRungkut from '@/assets/gor_rungkut.jpeg'

export default {
  name: 'SewaLapangan',
  data() {
    return {
      lapanganList: [
        { 
          id: 1, 
          nama: 'GOR Rungkut Mapan Timur', 
          jenis: ['Futsal', 'Badminton'], 
          harga: 70000,
          rating: 5.0,
          lokasi: 'Surabaya',
          foto: GORRungkut
        }
      ]
    }
  }
}
</script>

<style scoped>
.sewa-container h1 {
  color: #222; /* warna gelap agar jelas */
}
.lapangan-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.lapangan-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 350px;
  transition: transform 0.2s;
}
.lapangan-card:hover {
  transform: scale(1.02);
}
.lapangan-foto {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.lapangan-info h2 {
  color: #222; /* warna gelap */
  margin: 0;
}
.lapangan-meta {
  color: #777;
  font-size: 14px;
  margin: 5px 0;
}
.lapangan-icons {
  margin: 10px 0;
}
.jenis-icon {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 4px 8px;
  margin-right: 5px;
  font-size: 13px;
  color: #222;
}
.harga {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}
.btn-lihat {
  display: inline-block;
  background-color: #ff5a5f;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}
</style>
