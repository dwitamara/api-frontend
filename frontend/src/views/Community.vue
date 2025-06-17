<template> 
  <div class="community">
    <!-- BANNER -->
    <div class="banner">
      <img src="@/assets/banner_mabar.jpg" alt="Banner Mabar" />
    </div>

    <!-- Filter -->
    <div class="filter-sort">
      <p>Menampilkan {{ events.length }} event mabar</p>
      <label>
        Urutkan berdasarkan:
        <select v-model="sortOption" @change="sortEvents">
          <option value="datetime">Waktu dan Tanggal</option>
          <option value="lapangan">Nama Lapangan</option>
        </select>
      </label>
    </div>

    <!-- EVENT CARD -->
    <div class="event-list">
      <div v-if="events.length === 0">Tidak ada event komunitas.</div>

      <div v-for="event in events" :key="event.id" class="event-card">
        <h2 class="event-title">Mabar di {{ event.nama_lapangan }}</h2>
        <p class="event-meta">
          <strong>{{ event.nama_olahraga }}</strong> • {{ event.jam_mulai }} - {{ event.jam_selesai }}
        </p>
        <p class="event-date">📅 {{ formatDate(event.tanggalBooking) }}</p>
        <p class="event-location">📍 {{ event.alamat_lapangan }}</p>
        <div class="host-info">
          <img :src="`https://i.pravatar.cc/50?u=${event.userId}`" alt="Host" class="host-img" />
          <div class="host-text">
            <strong class="host-name">{{ event.nama_user }}</strong><br />
            <span class="host-rating">
              Rp{{ event.separuh.toLocaleString("id-ID") }}
              <span v-if="event.isLookingForPartner"> (Patungan)</span>
            </span><br />
            <span class="host-phone">📞 {{ formatPhone(event.no_hp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Community',
  data() {
    return {
      events: [],
      sortOption: 'datetime',
    };
  },
  methods: {
    formatDate(tanggal) {
      const date = new Date(tanggal);
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },
    formatPhone(nomor) {
      if (!nomor) return "Tidak tersedia";
      return nomor.replace(/(\d{4})(\d{4})(\d+)/, '$1 $2 $3');
    },
    sortEvents() {
      if (this.sortOption === 'datetime') {
        this.events.sort((a, b) => new Date(a.tanggalBooking) - new Date(b.tanggalBooking));
      } else if (this.sortOption === 'lapangan') {
        this.events.sort((a, b) => a.nama_lapangan.localeCompare(b.nama_lapangan));
      }
    },
    async fetchCommunityEvents() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/book/for-community", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const filtered = response.data.data.filter(item => item.isLookingForPartner);

        // Ambil jam dan menit tanpa geser waktu
        const ambilJamMenit = (str) => {
          if (!str) return "-";
          const time = str.split("T")[1]; // hasil: "12:00:00.000Z"
          return time.slice(0, 5); // ambil "12:00"
        };

        this.events = filtered.map(item => {
          const jamMulai = ambilJamMenit(item.slotWaktu?.jamMulai);
          const jamSelesai = ambilJamMenit(item.slotWaktu?.jamSelesai);

          return {
            id: item.id,
            userId: item.user?.id || "user",
            nama_user: item.user?.username || "User",
            no_hp: item.user?.nomor || "Tidak tersedia",
            nama_lapangan: item.detailLapangan?.nama || "Lapangan",
            alamat_lapangan: item.detailLapangan?.alamat || "Alamat tidak tersedia",
            tanggalBooking: item.tanggalBooking,
            nama_olahraga: item.detailLapangan?.tipeLapangan || "Olahraga",
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            isLookingForPartner: true,
            separuh: Math.floor((item.totalharga || 0) / 2)
          };
        });

        this.sortEvents();
      } catch (err) {
        console.error("❌ Gagal mengambil data komunitas:", err);
      }
    }
  },
  mounted() {
    this.fetchCommunityEvents();
  }
};
</script>

<style scoped>
.community {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.banner img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 20px;
}

.filter-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  background-color: #f9f9f9;
}

.host-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.host-img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 12px;
}

.host-text .host-name {
  font-weight: bold;
}

.host-text .host-rating {
  color: #2b9348;
  font-size: 14px;
}

.host-phone {
  color: #333;
  font-size: 14px;
}
</style>


<style scoped>
.community {
  background-color: #cce4ff;
  padding: 20px;
}
.banner img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}
.filter-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.event-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.event-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.event-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.event-meta {
  font-weight: bold;
  color: #e57373;
}
.event-date, .event-location {
  color: #3f51b5;
  margin-top: 4px;
}
.host-info {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.host-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.host-text {
  margin-left: 10px;
}
.host-name {
  color: #333;
}
.host-rating {
  color: #f9a825;
}
</style>