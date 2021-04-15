<template>
  <div>
    <main-navbar />
    <router-view />
  </div>
</template>

<script>
import mainNavbar from "/src/main-navbar/main-navbar.vue";

export default {
  components: { mainNavbar },
};
</script>
