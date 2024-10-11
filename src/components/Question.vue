<script setup>
import { ref } from 'vue';
const props = defineProps({
  text: String,
  answers: Array,
  conteudo: String,
  dificuldades: Array,
  correctAnswer: String
})

const rightConteudo = ref(() => {
  if(props.conteudo === 'cinematica') return 'Cinemática'
  if(props.conteudo === 'dinamica') return 'Dinâmica'
  if(props.conteudo === 'estatica') return 'Estática e Hidrostática'
})

const rightDificuldade = ref((dificuldade) => {

    if(dificuldade == 0) return'Compreensão Conceitual'
    if(dificuldade == 1) return 'Resolução de Problemas'
    if(dificuldade == 2) return 'Aplicações Matemáticas'
    if(dificuldade == 3) return 'Interpretação de Texto'
    if(dificuldade == 4) return'Análise Teórica'

  return ''
})

const alternativas = ref({
  A: false,
  B: false,
  C: false,
  D: false,
  E: false,
});

const selecionado = ref('');
const modalAcertou = ref(false)
const modalErrou = ref(false)
const naoSelecionou = ref(false)

const toggleBotao = (alternativa) => {
  if (alternativas.value[alternativa]) {
    alternativas.value[alternativa] = false;
    selecionado.value = ''
  } else {
    for (const key in alternativas.value) {
      alternativas.value[key] = (key === alternativa);
      selecionado.value = alternativa
    }
  }
};

const modal = ref(false)
const toggleModal = () => {
      modal.value = !modal.value;
}



const confirmarResposta = () => {
  if(selecionado.value == '') {
    naoSelecionou.value = true
    return;
  }
  if(selecionado.value === props.correctAnswer) {
    naoSelecionou.value = false
    modalAcertou.value = true
  } else {
    naoSelecionou.value = false
    modalErrou.value = true
  }
}
const mostrarErrado = (elemento) => {
  if(modalErrou.value && elemento !== props.correctAnswer) {
    return true
  }
  return false
}
const mostrarCerto = (elemento) => {
  if(modalAcertou.value && elemento == props.correctAnswer) {
    return true
  }
  return false
}
const unicoCerto = (elemento) => {
  if(modalErrou.value && elemento == props.correctAnswer) {
    return true
  }
  return false
}
</script>

<template>
  <div class="container" v-if="correctAnswer">
    <div class="div-conteudo">
      <div>Conteúdo: {{rightConteudo()}}</div>
      <button class="button-dificuldade" @click="toggleModal">Dificuldades</button>
      <div v-if="modal" class="modal-dificuldades">
        <div class="modal-content"> 
          <mdicon name="close" class="icon-close" @click="toggleModal" />
          <div class="modal-content-p">
            <p v-for="dificuldade in dificuldades" :key="dificuldade">{{ rightDificuldade(dificuldade) }}</p>
          </div>
        </div>
    
      </div>
    </div>
    <div>
      {{ text }}
    </div>
    <div class="div-answers">
      <p :class="{errado: mostrarErrado('A'), certa: mostrarCerto('A') || unicoCerto('A') }"><button class="alternativa-botao" @click="toggleBotao('A')" :class="{ active: alternativas.A}">A</button> {{ answers[0] ?? '' }} </p>
      <p :class="{errado: mostrarErrado('B'), certa: mostrarCerto('B') || unicoCerto('B')  }"><button class="alternativa-botao" @click="toggleBotao('B')" :class="{ active: alternativas.B}">B</button> {{ answers[1] ?? '' }} </p>
      <p :class="{errado: mostrarErrado('C'), certa: mostrarCerto('C') || unicoCerto('C')  }"><button class="alternativa-botao" @click="toggleBotao('C')" :class="{ active: alternativas.C}">C</button> {{ answers[2] ?? '' }} </p>
      <p :class="{errado: mostrarErrado('D'), certa: mostrarCerto('D') || unicoCerto('D')  }"><button class="alternativa-botao" @click="toggleBotao('D')" :class="{ active: alternativas.D}">D</button> {{ answers[3] ?? '' }} </p>
      <p :class="{errado: mostrarErrado('E'), certa: mostrarCerto('E') || unicoCerto('E')  }"><button class="alternativa-botao" @click="toggleBotao('E')" :class="{ active: alternativas.E}">E</button> {{ answers[4] ?? '' }} </p>
    </div>
    <div class="div-confirm">
      <button class="button-confirm" @click="confirmarResposta" v-if="!modalAcertou && !modalErrou">Confirmar Resposta</button>
      <p v-if="naoSelecionou" class="errado a15px">Você precisa selecionar uma alternativa</p>
      <div class="final-texts-div">
        <p v-if="modalAcertou" class="certa a15px">Certa resposta!</p>
        <p v-if="modalErrou" class="errado a15px">Resposta Errada. Alternativa certa: {{ correctAnswer ?? '' }}</p>
        <button v-if="modalAcertou || modalErrou" class="button-dificuldade">Próxima Questão</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.a15px {
  font-size: 15px;
}
div .container {
  background-color: #FFF;
  border-radius: 10px;
  border: 2px solid #7175e7;
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-size: 18px;
  gap: 10px;
}
.div-conteudo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-dificuldade {
  font-size: 18px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  transition: .2s;
  background-color: #6b71ff;
}
.button-dificuldade:hover {
  background-color: #7175e7;
  cursor: pointer;
}
.modal-dificuldades {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5); /* Fundo cinza */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal-content {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;
  background-color: white; /* Fundo branco da modal */
  padding: 20px; /* Espaçamento interno */
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
  padding: 30px 30px 25px 25px;
}
.icon-close {
  color: #FF0000;
  position: absolute; /* Permite o posicionamento em relação à modal */
  top: 10px; /* Distância do topo */
  right: 10px; /* Distância da direita */
  cursor: pointer; 
}
.modal-content-p {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.div-answers {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.div-answers p {
  display: flex;
  align-items: center;
  gap: 5px;
}
.errado {
  color: #FF0000;
}
.certa {
  color: #5cc24c
}
.alternativa-botao {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background-color: #ececec;
}
.alternativa-botao:hover {
  background-color: #cac8c8;
  cursor: pointer;
}
.button-confirm {
  width: 50%;
  background-color: #5cc24c ;
  border: none;
  border-radius: 5px;
  padding: 10px 0px 10px 0px;
  font-size: 18px;
}
.button-confirm:hover {
  background-color: #4da340 ;
  transition: .2s;
  cursor: pointer;
}
.div-confirm {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.active {
  background-color: #cac8c8;
}
.final-texts-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  font-weight: 400;
}
</style>
