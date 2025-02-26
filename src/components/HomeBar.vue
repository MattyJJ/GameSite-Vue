<style scoped>
#nav-bar {
  position: fixed;
  list-style: none;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  width: 100%;
}

.nav-item {
  display: inline-block;
  background-color: darkslategray;

  padding: 15px 15px;
}

.nav-item:hover {
  background-color: darkslateblue;
}

.nav-text {
  display: inline;
  width: 100%;
  height: 100%;

  padding: 15px 15px;
}
</style>

<template>
  <header></header>
  <main>
    <ul id="nav-bar">
      <li class="nav-item"><RouterLink class="nav-text" to="/">Home</RouterLink></li>
      <li class="nav-item"><RouterLink class="nav-text" to="/snake">Snake</RouterLink></li>
      <li class="nav-item"><RouterLink class="nav-text" to="/sokoban">Sokoban</RouterLink></li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
