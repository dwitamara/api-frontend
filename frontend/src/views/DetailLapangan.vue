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
          <p class="harga">
            Rp {{ Number(lapangan.harga).toLocaleString() }}
            <span class="per-sesi">Per Sesi</span>
          </p>
        </div>

        <div class="jadwal-box">
          <h4>Pilih Tanggal</h4>
          <input type="date" v-model="tanggalDipilih" :min="today" />

          <button v-if="tanggalDipilih" class="btn-cek" @click="generateJadwal">
            Cek Ketersediaan
          </button>

          <div v-if="jadwal.length > 0">
            <h4 style="margin-top: 15px;">Pilih Jam</h4>
            <div class="jadwal-grid">
              <button
                v-for="slot in jadwal"
                :key="slot.id"
                class="slot-jam"
                :class="{ tersedia: slot.tersedia, selected: jadwalDipilih?.id === slot.id }"
                :disabled="!slot.tersedia"
                @click="pilihJadwal(slot)"
              >
                {{ slot.jamMulai.substring(0, 5) }} - {{ slot.jamSelesai.substring(0, 5) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tombol-bawah">
      <div v-if="jadwalDipilih">
        <router-link
          :to="{
            name: 'Booking',
            params: { id: lapangan.id },
            query: {
              slotWaktuId: jadwalDipilih.id,
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
            query: {
              slotWaktuId: jadwalDipilih.id,
              tanggal: tanggalDipilih,
              separuh: lapangan.harga / 2
            }
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
import axios from "axios"

export default {
  name: "DetailLapangan",
  data() {
    return {
      lapangan: null,
      jadwal: [],
      jadwalDipilih: null,
      tanggalDipilih: "",
      slotList: [],
      aturanVenue: [
        "Pelanggan harus datang tepat waktu.",
        "Dilarang membawa air mineral gelas.",
        "Dilarang bersandar di jaring.",
        "Dilarang membawa senjata tajam dan minuman keras.",
        "Dilarang memakai sepatu berdempul."
      ]
    }
  },
  computed: {
    today() {
      return new Date().toISOString().split("T")[0]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      await this.fetchLapangan()
      await this.fetchSlotWaktu()
    },
    getAuthHeaders() {
      const token = localStorage.getItem("token")
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    },
    async fetchLapangan() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://localhost:3000/lapangan/${id}`)
        this.lapangan = response.data.data
      } catch (err) {
        console.error("Gagal mengambil detail lapangan:", err)
      }
    },
    async fetchSlotWaktu() {
      try {
        const response = await axios.get("http://localhost:3000/waktu/all-waktu", this.getAuthHeaders())
        this.slotList = response.data.data
      } catch (err) {
        console.error("Gagal mengambil slot waktu:", err)
        alert("Token expired atau tidak valid. Silakan login ulang.")
      }
    },
    async generateJadwal() {
      if (!this.tanggalDipilih || !this.lapangan) return

      try {
        const tanggal = this.tanggalDipilih
        const lapanganId = this.lapangan.id
        const response = await axios.get(`http://localhost:3000/book/now/${tanggal}`, this.getAuthHeaders())

        const semuaBooking = response.data.data
        const bookingLapanganIni = semuaBooking.filter(
          b => b.lapanganId === lapanganId && b.status !== "CANCELED"
        )

        this.jadwal = this.slotList.map(slot => {
          const sudahBooking = bookingLapanganIni.some(b => b.slotWaktuId === slot.id)
          return {
            id: slot.id,
            jamMulai: slot.jamMulai,
            jamSelesai: slot.jamSelesai,
            tersedia: !sudahBooking
          }
        })

        this.jadwalDipilih = null
      } catch (err) {
        console.error("Gagal mengambil data booking:", err)
        alert("Terjadi kesalahan saat mengecek jadwal.")
      }
    },
    pilihJadwal(slot) {
      if (!slot.tersedia) {
        return alert("Jadwal tidak tersedia!")
      }
      this.jadwalDipilih = slot
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
.slot-jam:disabled {
  background-color: #eee;
  color: #999;
  cursor: not-allowed;
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