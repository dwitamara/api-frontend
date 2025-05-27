<template>
  <div>
  <HeroBanner />

  <div class="home-container">
    <section class="description">
      <h2>Tentang Kami</h2>
      <p>
        SportVenue adalah platform penyewaan lapangan yang memudahkan kamu untuk memesan lapangan 
        dengan cepat, aman, dan nyaman. Tersedia berbagai pilihan lapangan berkualitas dengan harga terjangkau.
      </p>
    </section>

    <!-- Lokasi -->
    <section class="location">
      <h2>Lokasi Kami</h2>
      <p>📍 Jl. Rungkut Mapan Timur XI, Rungkut Tengah, Kec. Gn. Anyar, Surabaya, Jawa Timur</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1683365534027!2d112.7803381!3d-7.334983899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbee45b48a99%3A0xa61ad91380c656eb!2sGOR%20Rungkut%20Mapan%20Timur!5e0!3m2!1sid!2sid!4v1748316470755!5m2!1sid!2sid"
        width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>

    <!-- Kontak -->
    <section class="contact">
      <h2>Kontak Kami</h2>
      <ul>
        <li>📞 Telepon: 0812-3456-7890</li>
        <li>✉️ Email: info@badmintonku.id</li>
        <li>📱 Instagram: @badmintonku.id</li>
      </ul>
    </section>
  </div>
  </div>
</template>

<script>

import HeroBanner from '@/components/HeroBanner.vue';
export default {
  name: 'Home',
  components: {
    HeroBanner
  }
}

</script>

<style scoped>
.home-container {
  font-family: Arial, sans-serif;
  color: #333333;
  min-height: 100vh;
}

section {
  margin-bottom: 40px;
}


.description,
.location,
.contact {
  background-color: #ffffff;
  color: #333333;
  padding: 20px;
  border: 1px solid #99cfff; /* border biru pastel */
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

h1, h2 {
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}
</style>

<!-- Tambahkan ini di luar <style scoped> agar berlaku global -->
<style>
html, body {
  background-color: #e6f2ff; /* biru pastel sangat lembut */
  margin: 0;
  padding: 0;
}
</style>
