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
          <option value="level">Level</option>
        </select>
      </label>
    </div>

    <!-- EVENT CARD -->
    <div class="event-list">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h2 class="event-title">{{ event.title }}</h2>
        <p class="event-meta"><strong>{{ event.sport }}</strong> • {{ event.level }}</p>
        <p class="event-date">📅 {{ formatDate(event.datetime) }}</p>
        <p class="event-location">📍 {{ event.location }}</p>
        <div class="host-info">
          <img :src="event.hostImage" alt="Host" class="host-img" />
          <div class="host-text">
            <strong class="host-name">{{ event.host }}</strong><br />
            <span class="host-rating">⭐ {{ event.rating }} ({{ event.reviews }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Community',
  data() {
    return {
      sortOption: 'datetime',
      events: [
        {
          id: 1,
          title: 'Mabar With Starlap',
          sport: 'Badminton',
          level: 'Beginner – Pro',
          datetime: '2025-05-29T20:00',
          location: 'Court 1 • Ultra Badminton Hall, Kota Tangerang',
          host: 'Starlap Community',
          hostImage: 'https://i.pravatar.cc/50?img=1',
          rating: 4.88,
          reviews: 44
        },
        {
          id: 2,
          title: 'Mabar Spesial Long Weekend',
          sport: 'Badminton',
          level: 'Newbie – Intermediate',
          datetime: '2025-05-29T10:00',
          location: 'Lapangan 4 • Gor Sima, Kota Depok',
          host: 'Co Card',
          hostImage: 'https://i.pravatar.cc/50?img=2',
          rating: 4.97,
          reviews: 172
        }
      ]
    };
  },
  methods: {
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    sortEvents() {
      if (this.sortOption === 'datetime') {
        this.events.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      } else if (this.sortOption === 'level') {
        this.events.sort((a, b) => a.level.localeCompare(b.level));
      }
    }
  },
  mounted() {
    this.sortEvents();
  }
};
</script>

<style scoped>
.community {
  max-width: 800px;
  margin: 0 auto;
  color: #333; /* Default text color */
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
  color: #ff8a80; /* Pink pastel */
  margin-bottom: 8px;
}

.event-date {
  color: #7faaff; /* Blue pastel */
  font-size: 14px;
  margin-bottom: 4px;
}

.event-location {
  color: #64b5f6; /* Light blue pastel */
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
  color: #fbc02d; /* Gold pastel */
}
</style>
