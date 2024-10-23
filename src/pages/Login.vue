<script setup>
import { ref } from 'vue';
import InputWithIcon from '../components/InputWithIcon.vue'
import Button from '@/components/Button.vue'
import router from '@/router'

const username = ref('');
const password = ref('');

let loginErrado = ref(false)

const login = async () => {
  if(password.value.length < 6) {
    return
  }
  if(username.value.length < 5) {
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      })
    });

    const data = await response.json()
    
    if (response.ok && data.success) {
      router.push({ name: 'Home' });
      const token = data.token;
      localStorage.setItem('jwtToken', token)
    } else {
      loginErrado.value = true
      console.error("Login failed:", data.message || "Unknown error");
    }

  } catch (error) {
    console.error("Error during registration:", error);
    // Handle fetch error (e.g., network issues)
  }
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
        <form class="forms" @submit.prevent="login">
          <InputWithIcon placeholder="Usuário" name="account" type="text" v-model="username" />
          <InputWithIcon placeholder="Senha" name="key" type="password" v-model="password" />
          <div class="div-errors">
            <p v-if="loginErrado" class="error">A senha e/ou usuário não conferem</p>
          </div>
          
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
  gap: 25px;
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
  gap: 25px;
}
.div-form {
  display: flex;
  gap: 5px;
}
.error {
  color: red;
}
.div-errors {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
