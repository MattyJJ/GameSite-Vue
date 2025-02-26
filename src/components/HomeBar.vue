<style scoped>
#nav-bar {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: inline-block;
  background-color: darkslategray;

  padding: 2%;
}

.nav-item:hover {
  background-color: darkslateblue;
}

.nav-text {
  display: inline;
}
</style>

<template>
  <header></header>
  <main>
    <ul id="nav-bar">
      <RouterLink class="nav-text" to="/"><li class="nav-item">Home</li></RouterLink>
      <RouterLink class="nav-text" to="/snake"> <li class="nav-item">Snake</li></RouterLink>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
