<template>
  <div>
    <HeroBanner />

    <div class="home-container">
      <!-- Deskripsi -->
      <section class="description decorated-section">
        <h2>Tentang Kami</h2>
        <p>
          SportVenue adalah platform penyewaan lapangan yang memudahkan kamu untuk memesan lapangan 
          dengan cepat, aman, dan nyaman. Tersedia berbagai pilihan lapangan berkualitas dengan harga terjangkau.
        </p>
      </section>

      <!-- Lokasi -->
      <section class="location decorated-section">
        <h2>Lokasi Kami</h2>
        <p>Jl. Rungkut Mapan Timur XI, Rungkut Tengah, Kec. Gn. Anyar, Surabaya, Jawa Timur</p>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1683365534027!2d112.7803381!3d-7.334983899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbee45b48a99%3A0xa61ad91380c656eb!2sGOR%20Rungkut%20Mapan%20Timur!5e0!3m2!1sid!2sid!4v1748316470755!5m2!1sid!2sid"
            width="100%"
            height="300"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-columns">
          <div class="footer-info">
            <h3>SportVenue</h3>
            <p>
              Platform pemesanan lapangan dengan kemudahan dan kenyamanan dalam satu genggaman.
            </p>
          </div>
          <div class="footer-contact">
            <h4>Hubungi Kami</h4>
            <ul>
              <li><i class="fas fa-phone-alt"></i> 0812-3456-7890</li>
              <li><i class="fas fa-envelope"></i> info@sportvenue.id</li>
              <li><i class="fas fa-instagram"></i> @sportvenue.id</li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>Menu</h4>
            <ul>
              <li>Beranda</li>
              <li>Tentang Kami</li>
              <li>Kontak</li>
            </ul>
          </div>
        </div>
        <p class="copyright">© 2025 SportVenue. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue'

export default {
  name: 'Home',
  components: {
    HeroBanner
  }
}
</script>

<style scoped>
.home-container {
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.description, .location {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
}

.description h2,
.location h2 {
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: #0d47a1;
}

.description p,
.location p {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.decorated-section {
  position: relative;
  padding: 60px 30px;
  background: linear-gradient(to right, #e3f2fd, #ffffff);
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
  border: 1px solid #bbdefb;
}

.decorated-section::before,
.decorated-section::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(33, 150, 243, 0.15);
  z-index: 0;
}

.decorated-section::before {
  width: 140px;
  height: 140px;
  top: -50px;
  left: -50px;
}

.decorated-section::after {
  width: 200px;
  height: 200px;
  bottom: -70px;
  right: -70px;
}

.map-container {
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  margin-top: 20px;
  z-index: 1;
  position: relative;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #bbdefb;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.footer {
  width: 100%;
  background: linear-gradient(135deg, #0d47a1, #1976d2);
  color: white;
  padding: 60px 40px 30px;
  box-shadow: 0 -4px 10px rgba(0,0,0,0.2);
  position: relative;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  margin-bottom: 20px;
}

.footer-info, .footer-contact, .footer-links {
  flex: 1;
  min-width: 200px;
}

.footer h3, .footer h4 {
  margin-bottom: 10px;
  color: #fff;
}

.footer p, .footer li {
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer ul {
  list-style: none;
  padding: 0;
}

.footer li i {
  margin-right: 8px;
}

.footer a {
  color: white;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.footer .copyright {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 20px;
}


/* Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
