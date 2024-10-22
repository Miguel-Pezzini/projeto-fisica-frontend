<script setup>
import InputWithIcon from '../components/InputWithIcon.vue'
import Button from '@/components/Button.vue'
import { ref } from 'vue';
import router from '@/router';

const username = ref('');
const email = ref('')
const password = ref('')
const passwordAgain = ref('')

const dificuldades = ref([])

const errors = ref({
  errouSenha: false,
  senhaPequena: false,
  usernamePequeno: false,
  emailInvalido: false,
  dificuldadesInvalido: false
})

const register = async () => {
  const validacoes = [
  () => {
    if (password.value !== passwordAgain.value) {
      errors.errouSenha = true;
    }
  },
  () => {
    if (password.value.length < 6) {
      errors.senhaPequena = true;
    }
  },
  () => {
    if (username.value.length < 5) {
      errors.usernamePequeno = true;
    }
  },
  () => {
    if (email.value.length < 7) {
      errors.emailInvalido = true;
    }
  },
  () => {
    if (!dificuldades._rawValue[0]) {
      errors.dificuldadesInvalido = true;
    }
  }
];

// Executar validações
validacoes.forEach(validacao => validacao());

// Verificar se houve erros
if (Object.values(errors).some(error => error)) {
  // Aqui você pode manipular os erros como quiser
  errors.value.errouSenha = errors.errouSenha;
  errors.value.senhaPequena = errors.senhaPequena;
  errors.value.usernamePequeno = errors.usernamePequeno;
  errors.value.emailInvalido = errors.emailInvalido;
  errors.value.dificuldadesInvalido = errors.dificuldadesInvalido;

  console.log(errors.value)
  
  return; // Interromper a execução se houver erros
}
  try {
    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        dificuldades: dificuldades._rawValue
      })
    });

    const data = await response.json()
    
    if (response.ok && data.success) {
      router.push({ name: 'Home' });
    } else {
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
        <h1>Crie sua conta!</h1>
        <p>Você já tem uma? <RouterLink :to="{ name: 'Login' }">Logar</RouterLink></p>
      </div>
      <div>
        <form class="forms" @submit.prevent="register">
          <InputWithIcon placeholder="Usuário" name="account" type="text" v-model="username" />
          <InputWithIcon placeholder="E-mail" name="email" type="text" v-model="email" />
          <InputWithIcon placeholder="Senha" name="key" type="password" v-model="password" />
          <InputWithIcon placeholder="Confirme sua senha" name="key" type="password" v-model="passwordAgain" />

          <h1 style="text-align: center; font-weight: 400;">Minhas dificuldades </h1>
          <div class="div-inputs-difficult">
            <div class="checkbox">
              <input type="checkbox" id="conceptualUnderstanding" name="difficultConceptual" :value="0" v-model="dificuldades">
              <label for="conceptualUnderstanding">Compreensão Conceitual</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="problemSolving" name="difficultProblemSolving"  :value="1" v-model="dificuldades">
              <label for="problemSolving">Resolução de Problemas</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="mathematicalApplications" name="difficultMathematical"  :value="2" v-model="dificuldades">
              <label for="mathematicalApplications">Aplicações Matemáticas</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="textInterpretation" name="difficultInterpretation" :value="3" v-model="dificuldades">
              <label for="textInterpretation">Interpretação de Texto</label><br>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="theoreticalAnalysis" name="difficultTheoretical" :value="4" v-model="dificuldades">
              <label for="theoreticalAnalysis">Análise Teórica</label>
            </div>
          </div>
          <div class="div-errors">
            <p v-if="errors.errouSenha" class="error">As 2 senhas tem que ser iguais</p>
            <p v-if="errors.senhaPequena" class="error">A senha tem que ter no mínimo 6 caracteres</p>
            <p v-if="errors.usernamePequeno" class="error">O nome do usuário deve ter mais de 5 caracteres</p>
            <p v-if="errors.emailInvalido" class="error">O E-mail é inválido</p>
            <p v-if="errors.dificuldadesInvalido" class="error">Marque alguma dificuldade</p>
          </div>  
          <Button name="Cadastrar"/>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  font-family: 'Roboto';
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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border: 2px solid #6b71ff;

  width: 500px;

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
</style>
