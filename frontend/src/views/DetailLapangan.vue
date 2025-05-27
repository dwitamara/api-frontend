<template>
  <div class="detail-container">
    <img :src="lapangan.foto" alt="Foto Lapangan" class="foto-detail" />

    <div class="detail-main">
      <div class="info-kiri">
        <h1>{{ lapangan.nama }}</h1>
        <p class="rating-lokasi">⭐ {{ lapangan.rating }} • {{ lapangan.lokasi }}</p>
        <div class="jenis-tag">
          <span v-for="jenis in lapangan.jenis" :key="jenis" class="badge">{{ jenis }}</span>
        </div>

        <section class="section">
          <h3>Deskripsi</h3>
          <p>{{ lapangan.deskripsi }}</p>
        </section>

        <section class="section">
          <h3>Aturan Venue</h3>
          <ol>
            <li v-for="(aturan, index) in lapangan.aturan" :key="index">{{ aturan }}</li>
          </ol>
        </section>
      </div>

      <div class="info-kanan">
        <div class="harga-box">
          <p class="mulai">Mulai dari</p>
          <p class="harga">Rp {{ lapangan.harga.toLocaleString() }} <span class="per-sesi">Per Sesi</span></p>
          <button class="btn-cek">Cek Ketersediaan</button>
        </div>

        <div class="jadwal-box">
          <h4>Pilih Jadwal</h4>
          <div class="jadwal-grid">
            <button
              v-for="(jam, index) in jadwal"
              :key="index"
              class="slot-jam"
              :class="{ tersedia: jam.tersedia }"
              @click="pilihJadwal(jam)"
            >
              {{ jam.jam }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <router-link :to="`/detail-pembayaran/${lapangan.id}`" class="btn-sewa">Lanjut ke Pembayaran</router-link>
  </div>
</template>

<script>
export default {
  name: 'DetailLapangan',
  props: ['id'],
  data() {
    return {
      lapangan: {},
      jadwal: []
    };
  },
  created() {
    const dataLapangan = {
      1: {
        id: 1,
        nama: 'Metro Atom Futsal Badminton',
        jenis: ['Futsal', 'Badminton'],
        harga: 70000,
        rating: 5.0,
        lokasi: 'Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
        foto: 'https://source.unsplash.com/800x400/?badminton,court',
        deskripsi: 'Metro Atom Futsal Badminton',
        aturan: [
          'Pelanggan harus datang tepat waktu.',
          'Dilarang membawa air mineral gelas.',
          'Dilarang bersandar di jaring.',
          'Dilarang membawa senjata tajam dan minuman keras.',
          'Dilarang memakai sepatu berdempul.'
        ]
      }
    };

    const jadwal = [];
    for (let jam = 10; jam <= 21; jam++) {
      jadwal.push({
        jam: `${jam}:00 - ${jam + 1}:00`,
        tersedia: Math.random() > 0.2
      });
    }

    this.lapangan = dataLapangan[this.id];
    this.jadwal = jadwal;
  },
  methods: {
    pilihJadwal(jam) {
      if (!jam.tersedia) return alert('Jadwal tidak tersedia!');
      alert(`Kamu memilih jam: ${jam.jam}`);
    }
  }
};
</script>

<style scoped>
.detail-container {
  padding: 20px;
}
.foto-detail {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}
.detail-main {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.info-kiri {
  flex: 2;
}
.info-kanan {
  flex: 1;
}
.rating-lokasi {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
.jenis-tag {
  margin-bottom: 15px;
}
.badge {
  display: inline-block;
  background: #eee;
  border-radius: 8px;
  padding: 4px 10px;
  margin-right: 5px;
  font-size: 13px;
}
.section {
  margin-bottom: 20px;
}
.harga-box {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.mulai {
  font-size: 13px;
  color: #777;
}
.harga {
  font-size: 24px;
  color: #b00020;
  font-weight: bold;
}
.per-sesi {
  font-size: 13px;
  color: #777;
}
.btn-cek {
  background-color: #8b0000;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  width: 100%;
}
.jadwal-box {
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
}
.jadwal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}
.slot-jam {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f3f3f3;
  cursor: pointer;
}
.slot-jam.tersedia {
  background-color: #d4edda;
  border-color: #28a745;
}
.btn-sewa {
  display: block;
  margin: 30px auto 0;
  background-color: #2ecc71;
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
}
</style>
