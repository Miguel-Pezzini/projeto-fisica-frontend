<script setup>
defineProps({
  placeholder: String,
  name: String,
  type: String,
  value: String,
})
</script>

<template>
  <div class="main">
    <mdicon :name="name" />
    <input :type="type" :placeholder="placeholder" :value="value"/>
  </div>
</template>

<style scoped>
::placeholder {
  color: #999;
}
.main {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 10px;
  border: 1px solid #999;
  border-radius: 10px;
}
input {
  border: none;
  font-size: 24px;
  outline: 0;
}
</style>
