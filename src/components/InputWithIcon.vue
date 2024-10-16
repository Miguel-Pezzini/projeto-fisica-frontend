<script setup>
import { ref, watch, defineProps, toRefs } from 'vue';

const props = defineProps({
  placeholder: String,
  name: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String, 
});

const { placeholder, name, type, modelValue } = toRefs(props);

const inputValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
  inputValue.value = newValue;
});
</script>

<template>
  <div class="main">
    <mdicon :name="name" />
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="$emit('update:modelValue', inputValue)"
    />
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
