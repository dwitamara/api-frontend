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
  max-width: 900px;
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  color: #333;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.foto-detail {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 28px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.07);
}

.detail-main {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.info-kiri {
  flex: 2;
  text-align: left;
}

.info-kanan {
  flex: 1;
}

h1 {
  font-size: 30px;
  margin-bottom: 10px;
  color: #0d47a1;
  font-weight: 700;
}

h3, h4 {
  color: #0d47a1;
  font-weight: 600;
}

p, ol, li {
  text-align: left;
  color: #444;
  line-height: 1.7;
}

.lokasi {
  font-size: 14px;
  color: #607d8b;
  margin-bottom: 12px;
}

.jenis-tag {
  margin-bottom: 20px;
}

.badge {
  background-color: #90caf9;
  color: white;
  padding: 6px 14px;
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
  margin-bottom: 6px;
}

.harga-box {
  background: linear-gradient(to right, #e3f2fd, #bbdefb);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  text-align: left;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.mulai,
.per-sesi {
  font-size: 13px;
  color: #555;
}

.harga {
  font-size: 28px;
  color: #0d47a1;
  font-weight: bold;
}

.jadwal-box {
  background-color: #f9f9f9;
  border: 1px solid #bbdefb;
  padding: 20px;
  border-radius: 16px;
  font-size: 15px;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.jadwal-box h4 {
  margin-bottom: 12px;
  font-size: 16px;
  color: #0d47a1;
}

.jadwal-box input[type='date'] {
  padding: 10px;
  margin-bottom: 14px;
  width: 100%;
  border: 1px solid #90caf9;
  border-radius: 10px;
  font-size: 14px;
  background-color: #ffffff;
  color: #0d47a1;
}

.btn-cek {
  background-color: #1e88e5;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-cek:hover {
  background-color: #1565c0;
}

.jadwal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 10px;
}

.slot-jam {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #90caf9;
  background-color: #e3f2fd;
  color: #0d47a1;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  text-align: center;
}

.slot-jam:hover {
  background-color: #bbdefb;
}

.slot-jam.tersedia {
  background-color: #42a5f5;
  border-color: #64b5f6;
  color: white;
}

.slot-jam.selected {
  border-color: #1976d2;
  background-color: #64b5f6;
  color: white;
}

.slot-jam:disabled {
  background-color: #eeeeee;
  color: #aaaaaa;
  cursor: not-allowed;
}

.tombol-bawah {
  margin-top: 40px;
  text-align: center;
}

.btn-sewa {
  display: inline-block;
  background-color: #1e88e5;
  color: white;
  padding: 14px 30px;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 5px;
  font-size: 15px;
  transition: background-color 0.3s;
}

.btn-sewa:hover {
  background-color: #1565c0;
}

.btn-sewa.disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
}
</style>