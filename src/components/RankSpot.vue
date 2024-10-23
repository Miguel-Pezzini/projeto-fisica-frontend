<script setup>
defineProps({
  name: String,
  points: Number,
  ranking: Number
})
</script>

<template>
  <div class="ranking-container">
    <div class="div-ranking-name">
      <div class="ranking">{{ ranking }}º</div>
      <div class="name">{{ name }}</div>
    </div>
    
    <div class="points">{{ points }}</div>
  </div>
</template>

<style scoped>
.ranking-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  border-bottom: 1px solid #6b71ff;
  padding: 10px 20px; /* Espaçamento interno */
  transition: background-color 0.3s;
}

.ranking-container:hover {
  background-color: #f0f0ff; /* Cor ao passar o mouse */
}

.div-ranking-name {
  display: flex;
  align-items: center;
  gap: 20px; /* Ajusta o espaço entre ranking e nome */
}

.ranking {
  font-weight: bold; /* Deixa o ranking em negrito */
  color: #6b71ff; /* Cor do ranking */
}

.name {
  font-weight: 500; /* Peso da fonte do nome */
  color: #333; /* Cor do texto do nome */
}

.points {
  font-weight: 600; /* Peso da fonte dos pontos */
  color: #444; /* Cor do texto dos pontos */
}
</style>
