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
        <h2 class="event-title">Main Bareng di {{ event.nama_lapangan }}</h2>
        <p class="event-meta"><strong>Badminton</strong> • {{ event.slot_waktu }}</p>
        <p class="event-date">📅 {{ formatDate(event.tanggal) }}</p>
        <p class="event-location">📍 {{ event.alamat_lapangan }}</p>
        <div class="host-info">
          <img src="https://i.pravatar.cc/50" alt="Host" class="host-img" />
          <div class="host-text">
            <strong class="host-name">{{ event.nama_user }}</strong><br />
            <span class="host-rating">Rp{{ event.separuh }}</span>
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
    sortEvents() {
      if (this.sortOption === 'datetime') {
        this.events.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
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

        // Sesuaikan dengan struktur data dari backend kamu
        this.events = response.data.data.map(item => ({
          id: item.id,
          nama_lapangan: item.lapangan?.nama || "Lapangan",
          alamat_lapangan: item.lapangan?.alamat || "Alamat tidak tersedia",
          slot_waktu: item.slot_waktu?.jam_mulai + " - " + item.slot_waktu?.jam_selesai,
          tanggal: item.tanggal,
          separuh: item.separuh,
          nama_user: item.user?.nama || "User"
        }));

        this.sortEvents();
      } catch (err) {
        console.error("Gagal mengambil data komunitas:", err);
      }
    }
  },
  mounted() {
    this.fetchCommunityEvents();
  }
};
</script>

<style scoped>
/* gaya tetap sama */
.community {
  max-width: 800px;
  margin: 0 auto;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
}
.banner img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 16px;
}
.filter-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  color: #444;
  font-size: 14px;
}
.filter-sort select {
  margin-left: 8px;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  color: #333;
}
.event-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}
.event-title {
  color: #4a4a4a;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}
.event-meta {
  color: #ff8a80;
  margin-bottom: 8px;
}
.event-date {
  color: #7faaff;
  font-size: 14px;
  margin-bottom: 4px;
}
.event-location {
  color: #64b5f6;
  font-size: 14px;
  margin-bottom: 12px;
}
.host-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.host-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}
.host-text {
  color: #5d5d5d;
}
.host-name {
  font-size: 15px;
  color: #444;
}
.host-rating {
  font-size: 13px;
  color: #fbc02d;
}
</style>
