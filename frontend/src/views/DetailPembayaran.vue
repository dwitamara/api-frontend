<template>
  <div class="page-background">
    <div class="pembayaran-wrapper" v-if="isLoggedIn">
      <h1>Detail Pembayaran</h1>

      <div class="section-card">
        <h2>Rincian Biaya</h2>
        <div class="biaya-item">
          <span>Biaya Sewa</span><span>Rp{{ formatRupiah(lapangan.harga * durasi) }}</span>
        </div>
        <div class="biaya-item">
          <span>Biaya Produk Tambahan</span><span>Rp0</span>
        </div>
        <div class="biaya-item">
          <span>Total Biaya (Lunas)</span><span>Rp{{ formatRupiah(lapangan.harga * durasi) }}</span>
        </div>
        <div class="biaya-item">
          <span>Convenience Fee</span><span>Rp0</span>
        </div>
        <div class="biaya-item">
          <span>Biaya Transaksi</span><span>Rp0</span>
        </div>
        <div class="biaya-total">
          <strong>Total Bayar</strong><strong>Rp{{ formatRupiah(total) }}</strong>
        </div>
      </div>

      <div class="section-card">
        <h2>Metode Pembayaran</h2>
        <div
          class="metode-pilihan"
          v-for="opsi in metodeOptions"
          :key="opsi.nama"
          @click="pilihMetode(opsi)"
        >
          <img :src="opsi.logo" alt="" class="logo-bank" />
          <div class="info">
            <p>{{ opsi.nama }}</p>
            <small v-if="opsi.biaya > 0">Rp{{ opsi.biaya.toLocaleString() }}</small>
          </div>
          <input type="radio" :value="opsi.nama" v-model="metodePembayaran" />
        </div>
      </div>

      <div class="persetujuan">
        <p>
          Dengan mengklik tombol berikut, Anda menyetujui
          <a href="#">Syarat dan Ketentuan</a> serta
          <a href="#">Kebijakan privasi</a>.
        </p>
      </div>

      <button class="btn-bayar" :disabled="!metodePembayaran" @click="submitPembayaran">
        Lakukan Pembayaran
      </button>
    </div>

    <div v-else class="not-logged-in">
      <p>
        Anda harus <router-link to="/login">login</router-link> terlebih dahulu untuk melakukan
        pembayaran.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailPembayaran',
  data() {
    return {
      isLoggedIn: true,
      lapangan: {
        id: this.$route.params.id,
        nama: 'GOR Rungkut Mapan',
        jenis: 'Indoor',
        harga: 100000
      },
      durasi: 1,
      metodePembayaran: '',
      metodeOptions: [
        { nama: 'Transfer Virtual Account', biaya: 0, logo: 'https://i.ibb.co/x58j2TP/virtual-account.png' },
        { nama: 'Alfamart', biaya: 6500, logo: 'https://i.ibb.co/BKNKtyk/alfamart.png' },
        { nama: 'GoPay', biaya: 3600, logo: 'https://i.ibb.co/jfJ3RVc/gopay.png' },
        { nama: 'ShopeePay', biaya: 3300, logo: 'https://i.ibb.co/zfgKmjk/shopeepay.png' }
      ]
    };
  },
  computed: {
    total() {
      return this.lapangan.harga * this.durasi;
    }
  },
  methods: {
    formatRupiah(nilai) {
      return nilai.toLocaleString('id-ID');
    },
    pilihMetode(opsi) {
      this.metodePembayaran = opsi.nama;
    },
    submitPembayaran() {
      alert(`Pembayaran berhasil! Metode: ${this.metodePembayaran} | Total: Rp${this.formatRupiah(this.total)}`);
      // Tambahkan logika API / navigasi di sini
    }
  }
};
</script>

<style scoped>
.page-background {
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 30px 15px;
}

.pembayaran-wrapper {
  max-width: 650px;
  margin: 0 auto;
  padding: 25px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #ffffff;
  color: #333;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  color: #444;
  margin-bottom: 12px;
}

.section-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid #eee;
}

.biaya-item,
.biaya-total {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.biaya-total {
  border-top: 1px solid #ddd;
  margin-top: 10px;
  padding-top: 12px;
  font-weight: bold;
}

.metode-pilihan {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.metode-pilihan:hover {
  background-color: #f7f7f7;
}

.logo-bank {
  width: 40px;
  margin-right: 15px;
}

.info {
  flex: 1;
}

input[type='radio'] {
  transform: scale(1.3);
  accent-color: #c0392b;
}

.persetujuan {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.persetujuan a {
  color: #c0392b;
  font-weight: bold;
  text-decoration: none;
}

.btn-bayar {
  width: 100%;
  padding: 14px;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-bayar:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.not-logged-in {
  text-align: center;
  color: #444;
  font-size: 16px;
}
</style>
