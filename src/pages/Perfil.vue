<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import InputWithIcon from '@/components/InputWithIcon.vue';
import Button from '@/components/Button.vue';

const user = ref({})

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:3000/users/fetchUser', {
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

    user.value = data.user;
    
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

onMounted(fetchUser)

let perfilAlterado = ref(false)
let dificuldadeAlterada = ref(false)

const errors = ref({
  usernamePequeno: false,
  emailInvalido: false,
  emailRepetido: false,
  usernameRepetido: false
})

const alterarPerfil = async () => {
  perfilAlterado.value = false
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = false;
  });

  const validacoesErros = [
    () => {
      if (user.value.username.length < 5) {
        errors.value.usernamePequeno = true;
      }
    },
    () => {
      if (user.value.email.length < 7) {
        errors.value.emailInvalido = true;
      }
    },
  ];

  // Executar validações
  validacoesErros.forEach(validacao => validacao());

  // Verificar se houve erros
  if (Object.values(errors.value).some(error => error)) {
    console.log(errors.value);
    return; // Interromper a execução se houver erros
  }

  try {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:3000/users/changeUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: user.value.username,
        email: user.value.email,
      })
    });

    const data = await response.json()
    
    if (response.ok && data.success) {
      perfilAlterado.value = true
      user.value.username = data.username;
      user.value.email = data.email
    } else {
      const dadosRepetidos = [
    () => {
      if (data.message = 'email alredy exists') {
        errors.value.emailRepetido = true;
      }
      if(data.message = 'username alredy exists') {
        errors.value.usernameRepetido = true
      }
    },
  ];

  dadosRepetidos.forEach(validacao => validacao());

  if (Object.values(errors.value).some(error => error)) {
    console.log(errors.value);
  }
      console.error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    // Handle fetch error (e.g., network issues)
  }
}

let dificuldadeEmBranco = ref(false)

const alterarDificuldades = async () => {
  dificuldadeAlterada.value = false
  dificuldadeEmBranco.value = false

  console.log(user.value.dificuldades)

  if(!user.value.dificuldades[0] && user.value.dificuldades[0] !== 0) {
    dificuldadeEmBranco.value = true
    return
  }

  try {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:3000/users/changeDifficulty', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        dificuldades: user.value.dificuldades
      })
    });

    const data = await response.json()
    
    if (response.ok && data.success) {
      dificuldadeAlterada.value = true
    } else {
      console.error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    // Handle fetch error (e.g., network issues)
  }
}


</script>

<template>
  <Header/>
  <div class="page">
    <div class="container">
        <form class="form-perfil" @submit.prevent="alterarPerfil">
          <div class="div-perfil">
            <h1 style="text-align: center; font-weight: 400;">Meu perfil </h1>
            <div class="div-inputs">
              <InputWithIcon type="text" name="account" placeholder="Usuário" v-model="user.username"/>
              <InputWithIcon type="text" name="email" placeholder="E-mail" v-model="user.email"/>
            </div>
          </div>
          <div class="div-button-errors">
            <div class="div-errors">
              <p v-if="perfilAlterado" class="success">Seu perfil foi alterado com sucesso</p>
              <p v-if="errors.usernamePequeno" class="error">O nome do usuário deve ter mais de 5 caracteres</p>
              <p v-if="errors.emailInvalido" class="error">O E-mail é inválido</p>
              <p v-if="errors.usernameRepetido" class="error">Esse nome de usuário já está em uso</p>
              <p v-if="errors.emailRepetido" class="error">Esse E-mail já está em uso</p>
            </div> 
            <Button name="Alterar Perfil" />
          </div>
        </form>
        <form class="form-dificult" @submit.prevent="alterarDificuldades">
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
          <div class="div-button-errors">
              <p v-if="dificuldadeAlterada" class="success">Suas dificuldades foram alteradas com sucesso</p>
              <p v-if="dificuldadeEmBranco" class="error">Você deve preencher pelo menos uma dificuldade</p>
              <Button name="Alterar Dificuldades" />
          </div>
        </form>
    </div>
  </div>
</template>

<style scoped>
.success {
  color: #5cc24c;
}
.error {
  color: red;
}
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
  margin-bottom: 100px;
}
.form-perfil {
  display: flex;
  flex-direction: column;
  justify-content: space-between ;
}
.div-perfil {
  display: flex;
  flex-direction: column;
  gap: 35px;
}
.div-inputs {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.div-button-errors {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
