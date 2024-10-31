<script setup>
import router from '@/router'

  const Logout = () => {
    localStorage.removeItem('jwtToken');
    router.push({name: 'Login'})
  }
</script>
<template>
  <header>
    <img src="../assets/fisicafacil-high-resolution-logo-transparent.png" alt="Logo" />
    <div class="div-header">
      <ul>
        <div class="div-routers">
          <RouterLink :to="{name: 'Home' }">Ranking</RouterLink>
          <RouterLink :to="{name: 'Atividades' }">Atividades</RouterLink>
          <RouterLink :to="{name: 'Perfil' }">Meu perfil</RouterLink>
          <RouterLink :to="{name: 'Historico' }">Histórico</RouterLink>
        </div>
        <a class="logout" @click="Logout">Sair</a>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  gap: 50px;
  height: 100px;
  padding: 0 20px; /* Espaçamento lateral */
}
.div-routers {
  display: flex;
  align-items: center;
  gap: 10px;
}
.div-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
ul {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Alinhamento */
  list-style: none;
  padding: 0; /* Remove padding padrão */
  margin: 0; /* Remove margem padrão */
}
a {
  text-decoration: none;
  color: #000;
  padding: 15px 30px; /* Espaçamento */
  font-size: 25px; /* Tamanho do texto */
  border-radius: 10px; /* Bordas arredondadas */
  font-family: 'Roboto', sans-serif; /* Fonte */
  transition: background-color 0.3s; /* Transição suave */
}
a:hover {
  cursor: pointer;
  background-color: #ececec
}
img {
  width: 300px;
  height: 95px;
}
.logout {
  color: #fff;
  background-color: red;
  padding: 15px 30px; /* Espaçamento interno */
  margin-right: 50px;
  border-radius: 10px; /* Bordas arredondadas */
  transition: background-color 0.3s; /* Transição suave */
}
.logout:hover {
  background-color: darkred; /* Efeito de hover no botão Sair */
}
</style>
