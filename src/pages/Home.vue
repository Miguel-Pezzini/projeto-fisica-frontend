<script setup>
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import RankSpot from '@/components/RankSpot.vue';

const users = [
  {name: 'Miguel', points: 3000, ranking: 3, id: 1},
  {name: 'Pedro', points: 4000, ranking: 1, id: 2},
  {name: 'Maria', points: 3500, ranking: 2, id: 3},
  {name: 'João', points: 2500, ranking: 4, id: 3},
  {name: 'Maria', points: 2000, ranking: 5, id: 3},
  {name: 'Maria', points: 1500, ranking: 6, id: 3},
  {name: 'Maria', points: 1000, ranking: 7, id: 3},
]

const sortUsers = computed(() => {
  return users.slice().sort((a, b) => a.ranking - b.ranking);
});
</script>

<template>
    <Header />
    <div class="page">
    <div class="container">
      <div class="div-ranking">
        <h1 style="text-align: center; font-family: 'Roboto'; font-weight: 400; font-size: 40px;">Ranking</h1>
        <div class="label">
            <p class="border">Rank</p>
            <p class="border">Nome</p>
            <p class="border">Pontos</p>
          </div>
        <div class="ranking-spots">
          <RankSpot v-for="user in sortUsers" :key="user.id" :ranking="user.ranking" :name="user.name" :points="user.points"></RankSpot>
        </div>
      </div>
    </div>
  </div>
  </template>

<style scoped>
.page {
  background-color: #ececec;
  height: 810px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  justify-content: center;
}
.div-ranking {
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 2px solid #6b71ff;
  border-radius: 10px;
  width: 350px;
  margin-bottom: 200px;
  background-color: #fff;
}
.ranking-spots {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 5px;
}
.label {
  color: #6b71ff;
  margin-top: 10px;
  display: flex;
  justify-content:space-between;
  font-family: 'Roboto';
  font-size: 20px;
  border-bottom: 1px solid #6b71ff;
}

</style>
