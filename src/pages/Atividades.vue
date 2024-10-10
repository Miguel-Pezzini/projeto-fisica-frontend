<script setup>
import { computed, ref } from 'vue';
import Header from '@/components/Header.vue';
import Question from '@/components/Question.vue';
const questions = [{
  id: 1,
  text: 'Um veículo trafega em uma rodovia com velocidade média de 80 km/h. Sabendo que a viagem teve uma duração de 1 hora e 30 minutos (1,5 h), qual foi a distância percorrida pelo veículo?',
  answers: ['80 km', '10 km', '120 km', '160 km', '100 km'],
  correctAnswer : 'C',
  conteudo: 'cinematica',
  dificuldades: [0, 1, 2],
},
{
  id: 2,
  text: 'Quando a resultante das forças que atuam sobre um corpo é 10N, sua aceleração é 4m/s2. Se a resultante das forças fosse 12,5N, a aceleração seria de:',
  answers: ['2,5m/s2', '5,0m/s2', '7,5 m/s2', '2 m/s2', '12,5 m/s2'],
  correctAnswer : 'B',
  conteudo: 'dinamica',
  dificuldades: [0, 1, 2, 4],
},
{
  id: 3,
  text: 'Qual a posição do centro de massa de um sistema de partículas de 0,005 kg posicionadas nos pontos P1 = (-3, 4); P2 = (0, 2); P3 = (5, -3).',
  answers: ['(1;1)', '(0,67;1)', '(-2,-2)', '(1;0,67)', '(2;2)'],
  correctAnswer : 'B',
  conteudo: 'estatica',
  dificuldades: [3],
}]

const optionConteudo = ref('cinematica');

const computedQuestions = computed(() => {
  return questions.filter(question => {
    return question.conteudo === optionConteudo.value; // Use === para comparação e .value para acessar o valor do ref
  });
});



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
        <Question v-for="question in computedQuestions" :key="question.id" :correctAnswer="question.correctAnswer" :answers="question.answers" :text="question.text" :conteudo="question.conteudo" :dificuldades="question.dificuldades"></Question>
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
}
select option {
  font-size: 20px;
}

</style>
