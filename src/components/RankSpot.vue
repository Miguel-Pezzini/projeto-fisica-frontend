<script setup>
defineProps({
  name: String,
  points: Number,
  ranking: Number
})
</script>

<template>
  <div class="container">
    <div>{{ ranking }}º</div>
    <div>{{ name }}</div>
    <div>{{ points }}</div>
  </div>
</template>

<style scoped>
div .container {
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto';
  font-size: 24px;
  border-bottom: 1px solid #6b71ff;
}
</style>
