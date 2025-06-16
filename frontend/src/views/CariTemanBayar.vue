<template>
  <div class="cari-teman-container">
    <h1>Cari Teman Bermain</h1>
    <p>Lapangan ID: {{ $route.params.id }}</p>
    <p>Jadwal: {{ $route.query.jam }}</p>
    <p>Tanggal: {{ $route.query.tanggal }}</p>
    
    <p v-if="$route.query.separuh">
      Total yang dibayar sekarang:
      <strong>Rp {{ parseInt($route.query.separuh).toLocaleString() }}</strong>
    </p>
    <p v-else style="color: red;">
      Data harga tidak tersedia.
    </p>

    <button @click="bayarSeparuh" class="btn-bayar">Bayar dan Cari Teman</button>
  </div>
</template>

<script>
export default {
  name: 'CariTemanBayar',
  mounted() {
    console.log('Query params:', this.$route.query); // debug
  },
  methods: {
    bayarSeparuh() {
      alert('Pembayaran separuh berhasil! Data kamu ditampilkan di komunitas untuk cari teman.');
      this.$router.push('/community'); // ganti sesuai rute komunitas kamu
    }
  }
};
</script>

<style scoped>
.cari-teman-container {
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 24px;
  color: #1976d2;
  font-weight: bold;
}

.btn-bayar {
  background-color: #2ecc71;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}
</style>
