<template>
  <section class="hero-banner">
    <img :src="banner" alt="Sport Banner" class="banner-img" />

    <div class="overlay"></div>

    <div class="banner-content">
      <div class="banner-text">
        <h1>Selamat Datang di <span class="highlight">SportVenue</span></h1>
        <p>Sewa lapangan olahraga jadi mudah dan cepat.</p>
        <div class="cta-buttons">
          <button class="cta">Cari Lapangan</button>
          <button class="cta outline">Gabung Komunitas</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import banner from '@/assets/banner.png'; // Ganti dengan gambar yang kamu upload
</script>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center; /* ganti: tengah */
  box-sizing: border-box;
  padding: 0 60px;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.banner-content {
  position: relative; /* biar tetap di atas background */
  z-index: 3;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.banner-text {
  max-width: 600px;
  width: 100%;
  color: #0D47A1;
}

.banner-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.highlight {
  color: #FFC107;
}

.banner-text p {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #1565C0;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.cta {
  background-color: #ffc107;
  border: none;
  color: #0d47a1;
  padding: 10px 22px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta.outline {
  background: transparent;
  border: 2px solid #ffc107;
  color: #ffc107;
}

.cta:hover {
  background-color: #ffecb3;
  color: #0d47a1;
}

</style>
