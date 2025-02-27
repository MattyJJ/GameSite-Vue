<style scoped>
#text-container {
  margin-top: 20px;
}
</style>

<template>
  <header></header>
  <main>
    <HomeBar></HomeBar>

    <div id="text-container">
      <h1>Sokoban</h1>
      <p>There will soon be a a Sokoban game here.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import HomeBar from '@/components/HomeBar.vue'
</script>
