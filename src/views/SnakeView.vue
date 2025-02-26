<template>
  <main>
    <HomeBar />
    <div id="game-div">
      <SnakeGame />
    </div>
  </main>
</template>

<script setup lang="ts">
import HomeBar from '../components/HomeBar.vue'
import SnakeGame from '../components/SnakeGame.vue'
</script>
