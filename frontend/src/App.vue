<template>
  <div>
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar },
  computed: {
    showNavbar() {
      return !this.$route.path.startsWith('/admin');
    }
  }
};
</script>