<template>
  <div>
    <nav-bar></nav-bar>
      <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/beer_store/navbar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style scoped>
.container-fluid {
  padding-top: 70px;
}
</style>