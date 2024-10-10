<script setup></script>

<template>
  <header>
    <img src="../assets/Screenshot_3.png" />
    <div class="div-header">
      <ul>
        <RouterLink :to="{name: 'Home' }">Ranking</RouterLink>
        <RouterLink :to="{name: 'Atividades' }">Atividades</RouterLink>
        <RouterLink :to="{name: 'Perfil' }">Meu perfil</RouterLink>
        <RouterLink :to="{name: 'Login'}">Sair</RouterLink>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  border-bottom: 1px solid #000;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
  height: 100px;
}
.div-header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
}
ul {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
  padding: 20px;
  font-size: 25px;
  font-family: 'Roboto';
}
a:hover {
  cursor: pointer;
  background-color: #ececec;
  border-radius: 10px;
}
img {
  width: 150px;
  height: 95px;
}
</style>
