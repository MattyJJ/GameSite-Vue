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

.nav-text:hover {
}
</style>

<template>
  <header></header>
  <main>
    <ul id="nav-bar">
      <a class="nav-text" href="../views/HomeView.vue"><li class="nav-item">Home</li></a>
      <a class="nav-text" href="../views/SnakeView.vue"> <li class="nav-item">Snake</li></a>
    </ul>
  </main>
</template>

<script setup lang="ts"></script>
