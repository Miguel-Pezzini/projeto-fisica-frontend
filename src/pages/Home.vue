<script setup>
import { computed, onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import RankSpot from '@/components/RankSpot.vue';

const users = ref([]);

const computeRankings = (users) => {
  if (users.length === 0) return [];

  for(let i = 0; i < users.length; i++) {
    users[i].ranking = i + 1;
  }

  return users;
};

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:3000/users/fetchUsersRanking', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = await response.json();
    
    if (!response.ok && !data.success) {
      console.error("Login failed:", data.message || "Unknown error");
    } 

    users.value = computeRankings(data.users);
    
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

onMounted(fetchUsers)

const sortUsers = computed(() => {
  return users.value.slice().sort((a, b) => a.ranking - b.ranking);
});
</script>

<template>
  <Header />
  <div class="page">
    <div class="container">
      <div class="div-ranking">
        <h1 class="title">Ranking</h1>
        <div class="label">
          <p class="border">Rank</p>
          <p class="border">Nome</p>
          <p class="border">Pontos</p>
        </div>
        <div class="ranking-spots">
          <RankSpot 
            v-for="user in sortUsers" 
            :key="user.id" 
            :ranking="user.ranking" 
            :name="user.username" 
            :points="user.points" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: #f5f5f5;
  height: 810px;
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
  width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.div-ranking:hover {
  transform: translateY(-5px);
}

.title {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #6b71ff;
  margin-bottom: 20px;
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
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 500; 
  border-bottom: 1px solid #6b71ff;
  padding-bottom: 10px;
}
</style>
