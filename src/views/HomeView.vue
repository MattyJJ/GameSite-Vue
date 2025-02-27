<style scoped>
#home-text-container {
  margin-top: 20px;
}
</style>

<template>
  <header></header>
  <main>
    <HomeBar />

    <div id="home-text-container">
      <h1>Home</h1>
      <p>This site is just a compilation of JS Games i'm creating</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import HomeBar from '../components/HomeBar.vue'
</script>
