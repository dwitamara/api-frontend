<template>
  <div class="detail-container" v-if="lapangan">
    <img :src="lapangan.linkGambar" alt="Foto Lapangan" class="foto-detail" />

    <div class="detail-main">
      <div class="info-kiri">
        <h1>{{ lapangan.nama }}</h1>
        <p class="lokasi">{{ lapangan.alamat }}</p>
        <div class="jenis-tag">
          <span class="badge">{{ lapangan.tipeLapangan }}</span>
        </div>

        <section class="section">
          <h3>Deskripsi</h3>
          <p>{{ lapangan.deskripsi }}</p>
        </section>

        <section class="section">
          <h3>Aturan Venue</h3>
          <ol>
            <li v-for="(aturan, index) in aturanVenue" :key="index">{{ aturan }}</li>
          </ol>
        </section>
      </div>

      <div class="info-kanan">
        <div class="harga-box">
          <p class="mulai">Mulai dari</p>
          <p class="harga">Rp {{ lapangan.harga.toLocaleString() }} <span class="per-sesi">Per Sesi</span></p>
        </div>

        <div class="jadwal-box">
          <h4>Pilih Tanggal</h4>
          <input
            type="date"
            v-model="tanggalDipilih"
            :min="today"
          />

          <button
            v-if="tanggalDipilih"
            class="btn-cek"
            @click="generateJadwal"
          >
            Cek Ketersediaan
          </button>

          <!-- Tampilkan hanya jika jadwal sudah di-generate -->
          <div v-if="jadwal.length > 0">
            <h4 style="margin-top: 15px;">Pilih Jam</h4>
            <div class="jadwal-grid">
              <button
                v-for="(jam, index) in jadwal"
                :key="index"
                class="slot-jam"
                :class="{ tersedia: jam.tersedia, selected: jadwalDipilih === jam }"
                @click="pilihJadwal(jam)"
              >
                {{ jam.jam }}
              </button>
            </div>
          </div>
        </div> <!-- TUTUP .jadwal-box -->
      </div> <!-- TUTUP .info-kanan -->
    </div> <!-- TUTUP .detail-main -->

    <div class="tombol-bawah">
      <div v-if="jadwalDipilih">
        <router-link
  :to="{
    name: 'Booking',
    params: { id: lapangan.id },
    query: {
      jam: jadwalDipilih.jam,
      tanggal: tanggalDipilih,
      harga: lapangan.harga
    }
  }"
  class="btn-sewa"
>
  Lanjut ke Pembayaran
</router-link>


        <router-link
          :to="{
            name: 'CariTemanBayar',
            params: { id: lapangan.id },
            query: { jam: jadwalDipilih.jam, tanggal: tanggalDipilih, separuh: lapangan.harga / 2 }
          }"
          class="btn-sewa btn-cari"
        >
          Cari Teman Bermain
        </router-link>
      </div>

      <button v-else class="btn-sewa disabled" disabled>
        Pilih Jadwal Terlebih Dahulu
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailLapangan',
  data() {
    return {
      lapangan: null,
      jadwal: [],
      jadwalDipilih: null,
      tanggalDipilih: '',
      aturanVenue: [
        'Pelanggan harus datang tepat waktu.',
        'Dilarang membawa air mineral gelas.',
        'Dilarang bersandar di jaring.',
        'Dilarang membawa senjata tajam dan minuman keras.',
        'Dilarang memakai sepatu berdempul.'
      ]
    }
  },
  computed: {
    today() {
      const now = new Date()
      return now.toISOString().split('T')[0]
    }
  },
  mounted() {
    this.fetchLapangan()
  },
  methods: {
    async fetchLapangan() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://localhost:3000/lapangan/${id}`)
        this.lapangan = response.data.data
      } catch (error) {
        console.error('Gagal mengambil detail lapangan:', error)
      }
    },
    generateJadwal() {
      const jadwal = []
      for (let jam = 10; jam <= 21; jam++) {
        jadwal.push({
          jam: `${jam}:00 - ${jam + 1}:00`,
          tersedia: Math.random() > 0.2 // simulasi
        })
      }
      this.jadwal = jadwal
      this.jadwalDipilih = null
    },
    pilihJadwal(jam) {
      if (!jam.tersedia) {
        return alert('Jadwal tidak tersedia!')
      }
      this.jadwalDipilih = jam
    }
  }
}
</script>

<style scoped>
.detail-container {
  padding: 60px;
}
.foto-detail {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
}
.detail-main {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.info-kiri {
  flex: 2;
  text-align: left;
}
.info-kanan {
  flex: 1;
}
h1,
h3,
p,
ol,
li {
  text-align: left;
  color: #222;
}
.lokasi {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}
.jenis-tag {
  margin-bottom: 20px;
}
.badge {
  background: #e0e0e0;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}
.section {
  margin-bottom: 30px;
}
.section h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
.section p,
.section li {
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 8px;
}
.harga-box {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: left;
}
.mulai {
  font-size: 13px;
  color: #777;
}
.harga {
  font-size: 24px;
  color: #1976d2;
  font-weight: bold;
}
.per-sesi {
  font-size: 13px;
  color: #777;
}
.jadwal-box {
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  color: #222;
  text-align: left;
}
.jadwal-box h4 {
  margin-bottom: 10px;
}
.jadwal-box input[type='date'] {
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
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
  color: #000;
}
.slot-jam.tersedia {
  background-color: #d4edda;
  border-color: #28a745;
}
.slot-jam.selected {
  border-color: #2ecc71;
  background-color: #a3e4a3;
}
.tombol-bawah {
  margin-top: 30px;
  text-align: center;
}
.btn-sewa {
  display: inline-block;
  background-color: #1976d2;
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 5px;
}
.btn-sewa.disabled {
  background-color: #999;
  cursor: not-allowed;
}
.btn-cari {
  background-color: #2ecc71;
}
</style>
