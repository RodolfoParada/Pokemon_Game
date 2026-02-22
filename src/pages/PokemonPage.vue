<template>
  <div class="poke-game">
    
    <div v-if="!currentGen" class="gen-selector">
        <h2>Selecciona tu Generación para comenzar</h2>
        <button @click="startGame('kanto')">Kanto (Gen 1)</button>
        <button @click="startGame('johto')">Johto (Gen 2)</button>
        <button @click="startGame('all')">Todas las Generaciones</button>
    </div>

    <PokemonSkeleton v-else-if="!pokemon && !gameOver" />

    <div v-else>
      
       <div v-if="!gameOver" class="status-bar">
          <p>Puntos: {{ score }} / 10 | Vidas: {{ '❤️'.repeat(lives) }}</p>
       </div>

       <div v-if="gameOver" class="game-over-screen">
          <h1>{{ win ? '¡Maestro Pokémon!' : 'Entrenamiento terminado' }}</h1>
          <p>{{ message }}</p>
          <button @click="resetGame">Jugar de nuevo (Misma Gen)</button>
          <button @click="changeGen" class="btn-secondary">Cambiar Generación</button>
       </div>

       <div v-else-if="pokemon">
          <h1>¿Quién es este Pokémon?</h1>
          <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" :image="pokemon.img" />
          <PokemonOptions :pokemons="pokemonArr" :answerId="pokemon.id" @selection="checkAnswer" />

          <div v-if="showAnswer" class="fade-in">
            <h2>{{ message }}</h2>
            <button @click="nextRound">Siguiente Pokémon</button>
          </div>
       </div>
    </div>

  </div>
</template>>

<script>


import PokemonPicture from '@/components/PokemonPicture';
import PokemonOptions from '@/components/PokemonOptions';
import PokemonSkeleton from '@/components/PokemonSkeleton.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions';
// import { threadId } from 'worker_threads';

console.log(getPokemonOptions())


export default {
    components: { 
      PokemonPicture, 
      PokemonOptions,
      PokemonSkeleton,
    },
    data() {
      return {
        pokemonArr:[] ,
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message:'',
        // Lógica de juego
    score: 0,
    lives: 3,
    consecutiveAnswers: 0, // Contador para la racha
    currentGen: null,
    gameOver: false,
    win: false
      }
    },
    methods:{
// Se ejecuta solo al elegir generación en el menú
      async startGame(gen) {
        this.currentGen = gen;
        this.score = 0;
        this.lives = 3;
        this.consecutiveAnswers = 0;
        this.gameOver = false;
        await this.loadNextPokemon();
      },

      // Lógica central de carga de datos
      async loadNextPokemon() {
        this.pokemon = null;
        this.showPokemon = false;
        this.showAnswer = false;
        
        // getPokemonOptions ya usa la lógica de generaciones que creamos antes
        this.pokemonArr = await getPokemonOptions(this.currentGen);
        const rndInt = Math.floor(Math.random() * 4);
        this.pokemon = this.pokemonArr[rndInt];
},
checkAnswer(selectedId) {
        if (this.showAnswer || this.gameOver) return;

        this.showPokemon = true;
        this.showAnswer = true;

        // Lógica de sonido
        if (this.pokemon.cry) {
          const audio = new Audio(this.pokemon.cry);
          audio.volume = 0.5;
          audio.play().catch(() => {});
        }

        if (selectedId === this.pokemon.id) {
          // --- ACIERTO ---
          this.score++;
          this.consecutiveAnswers++;
          this.message = `¡Correcto, es ${this.pokemon.name}!`;

          if (this.consecutiveAnswers === 2 && this.lives < 5) {
            this.lives++;
            this.consecutiveAnswers = 0;
            this.message += " ¡+1 Vida por racha! ❤️";
          }

          if (this.score === 10) {
            this.win = true;
            this.gameOver = true;
            this.message = "¡Felicidades Maestro Pokémon! Has llegado a 10 puntos.";
          }
        } else {
          // --- ERROR ---
          this.lives--;
          this.consecutiveAnswers = 0;
          this.message = `¡Lo lamento! Era ${this.pokemon.name}`;

          // AQUÍ YA NO EXISTE EL this.score = 0
          
          if (this.lives === 0) {
            this.gameOver = true;
            this.message = `Game Over. Puntos totales: ${this.score} 💀`;
          }
        }
        // Se eliminó el bloque duplicado que causaba el error
      },
  // Pasa al siguiente Pokémon manteniendo la Gen
      nextRound() {
 
    // IMPORTANTE: NO pongas "this.score = 0" ni "this.pokemonArr = []" aquí
    this.loadNextPokemon();
      },
      // Reinicia puntos y vidas pero mantiene la Generación elegida
      resetGame() {
        this.startGame(this.currentGen);
      },

      // Borra la generación para forzar la vuelta al menú inicial
      changeGen() {
        this.currentGen = null;
        this.pokemonArr = [];
        this.score = 0;
        this.lives = 3;
      },
     
      newGame(){

        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
       // Llamamos a la mezcla usando la última generación guardada
    // this.mixPokemonArray(this.currentGen);

     },
 
    },
   mounted(){
      // this.mixPokemonArray()
      }



    }


</script>

<style>
.poke-game {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra todo el bloque en la pantalla */
  align-items: center;
  min-height: 80vh;      /* Ocupa todo el alto de la ventana */
  padding: 20px;
}



</style>