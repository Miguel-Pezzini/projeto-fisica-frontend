<script setup></script>

<template>
  <header>
    <img src="../assets/Screenshot_3.png" />
    <div class="div-header">
      <ul>
        <li>Home</li>
        <li>Atividades</li>
        <li>Meu perfil</li>
        <li>Sair</li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
  height: 105px;
}
.div-header {
  width: 100%;
  height: 105px;
  display: flex;
  align-items: center;
}
ul {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
}
ul li {
  padding: 20px;
  font-size: 25px;
  font-family: 'Roboto';
}
ul li:hover {
  cursor: pointer;
  background-color: #ececec;
  border-radius: 10px;
}
img {
  width: 150px;
}
</style>
