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
              Rp{{ event.fullpay.toLocaleString("id-ID") }} <span>(Sharing)</span>
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

        const ambilJamMenit = (str) => {
          if (!str) return "-";
          const time = str.split("T")[1];
          return time.slice(0, 5);
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
            fullpay: item.totalharga || 70000 // ambil totalharga asli, fallback ke 70rb
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
  max-width: 1000px;
  margin: auto;
  padding: 16px;
  background-color: #e3f2fd;
}

.banner img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.filter-sort {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #fffde7;
  color: #424242;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 6px solid #fbc02d;
}

.filter-sort select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #1976d2;
}

.event-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-left: 6px solid #1976d2;
}

.event-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #1976d2;
}

.event-meta .tipe {
  color: #f57f17;
}

.event-meta .jam {
  color: #2e7d32;
}

.event-date,
.event-location {
  color: #424242;
  margin-top: 4px;
}

.host-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.host-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.host-text {
  margin-left: 12px;
}

.host-name {
  font-weight: bold;
  font-size: 15px;
  color: #212121;
}

.host-rating {
  color: #fbc02d;
  font-weight: bold;
  font-size: 14px;
}

.host-phone {
  font-size: 13px;
  color: #616161;
}

/* Responsif */
@media (max-width: 600px) {
  .filter-sort {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .event-title {
    font-size: 18px;
  }

  .event-meta,
  .event-date,
  .event-location {
    font-size: 14px;
  }
}
</style>