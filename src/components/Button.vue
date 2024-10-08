<script setup>
defineProps({
  name: String
})
</script>

<template>
  <button>{{ name }}</button>
</template>

<style scoped>
button {
  width: 100%;
  background-color: #6b71ff;
  color: #090c02;
  border-radius: 10px;
  padding: 8px;
  border: none;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 400;
}
button:hover {
  cursor: pointer;
  background-color: #7175e7;
}
</style>
