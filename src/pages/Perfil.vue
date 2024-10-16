<script setup>
import Header from '@/components/Header.vue';
import InputWithIcon from '@/components/InputWithIcon.vue';
import Button from '@/components/Button.vue';

const user = {
  nome: 'Miguel',
  email: 'miguel.kuhr@gmail.com',
  dificuldades: [0, 1, 2],
}

</script>

<template>
  <Header/>
  <div class="page">
    <div class="container">
        <form class="form-perfil">
          <h1 style="text-align: center; font-weight: 400;">Meu perfil </h1>
          <div class="div-inputs">
            <InputWithIcon type="text" name="account" placeholder="Usuário" :value="user.nome"/>
            <InputWithIcon type="text" name="email" placeholder="E-mail" :value="user.email"/>
          </div>
          <Button name="Alterar Perfil" />
        </form>
        <form class="form-dificult">
          <h1 style="text-align: center; font-weight: 400;">Minhas dificuldades </h1>
          <div class="div-inputs-difficult">
            <div class="checkbox">
              <input type="checkbox" id="conceptualUnderstanding" name="difficultConceptual" :value="0" v-model="user.dificuldades">
              <label for="conceptualUnderstanding">Compreensão Conceitual</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="problemSolving" name="difficultProblemSolving"  :value="1" v-model="user.dificuldades">
              <label for="problemSolving">Resolução de Problemas</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="mathematicalApplications" name="difficultMathematical"  :value="2" v-model="user.dificuldades">
              <label for="mathematicalApplications">Aplicações Matemáticas</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="textInterpretation" name="difficultInterpretation" :value="3" v-model="user.dificuldades">
              <label for="textInterpretation">Interpretação de Texto</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="theoreticalAnalysis" name="difficultTheoretical" :value="4" v-model="user.dificuldades">
              <label for="theoreticalAnalysis">Análise Teórica</label>
            </div>
          </div>
          <Button name="Alterar Dificuldades" />
        </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  font-family: 'Roboto';
  background-color: #ececec;
  height: 810px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  gap: 50px;
  margin-bottom: 200px;
}
.div-inputs {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.div-inputs-difficult {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.div-inputs-difficult label {
  font-size: 20px;
}
.checkbox {
  display: flex;
  gap: 8px;
}

form {
  display: flex;
  background-color:#FFF;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #6b71ff;
  flex-direction: column;
  gap: 30px;
}

</style>
