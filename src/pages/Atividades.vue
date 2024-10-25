<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import Header from '@/components/Header.vue';
import Question from '@/components/Question.vue';

const optionConteudo = ref('cinematica');

const question = ref({})

const fetchQuestion = async () => {
  try {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:3000/questions/fetchQuestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        conteudo: optionConteudo.value
      })
    });

    const data = await response.json();
    
    if (!response.ok && !data.success) {
      console.error("Login failed:", data.message || "Unknown error");
    } 

    question.value = data.question;
    
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

const handleDataFromChild = (data) => {
  if(data) {
    fetchQuestion()
  }
}


watch(optionConteudo, (newValue) => {
  fetchQuestion(); // Chama a função sempre que optionConteudo mudar
});

fetchQuestion()

</script>

<template>
  <Header/>
  <div class="page">
    <div class="container">
      <div class="div-select">
        <label for="conteudos">Escolha um conteúdo: </label>
        <select name="conteudos" id="conteudos" v-model="optionConteudo">
            <option value="cinematica" >Cinemática</option>
            <option value="dinamica">Dinâmica</option>
            <option value="estatica">Estática e Hidrostática</option>
            <option value="gravitacao">Gravitação Universal</option>
        </select>
      </div>
      <div class="div-questions">
        <Question @send-data="handleDataFromChild" v-if="question" :points="question.points" :key="question.id" :correctAnswer="question.correctAnswer" :answers="question.answers" :text="question.text" :conteudo="question.conteudo" :dificuldades="question.dificuldades"></Question>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: #ececec;
  height: 810px;
  width: 100%;
}
.div-select {
  background-color: #FFF;
  font-size: 20px;
  padding: 20px;
  font-family: 'Roboto';
  border-bottom: 2px solid #000;
}
.div-questions {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
select {
  font-size: 20px;
  border-radius: 8px;
  outline: none;
}
select option {
  font-size: 20px;
}

</style>
