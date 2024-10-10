<script setup>
import InputWithIcon from '../components/InputWithIcon.vue'
import Button from '@/components/Button.vue'
import router from '@/router'

const goToLogin = () => {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div>
        <h1>Logue na sua conta!</h1>
        <p>
          Você ainda não tem uma? <RouterLink :to="{ name: 'Register' }">Registre-se</RouterLink>
        </p>
      </div>
      <div>
        <form class="forms" @submit.prevent="goToLogin">
          <InputWithIcon placeholder="Usuário" name="account" type="text" />
          <InputWithIcon placeholder="Senha" name="key" type="password" />
          <Button name="Logar" />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: #ececec;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  gap: 35px;
  border-radius: 10px;

  margin-bottom: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border: 2px solid #6b71ff;

  width: 450px;

  background-color: #fff;

  padding-top: 20px;
  padding-bottom: 20px;
}
h1 {
  font-family: 'Roboto';
  font-weight: 400;
}
p {
  font-family: 'Roboto';
  font-weight: 400;
}
a {
  color: #6b71ff;
  text-decoration: none;
}
.forms {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
}
.div-form {
  display: flex;
  gap: 5px;
}
</style>
