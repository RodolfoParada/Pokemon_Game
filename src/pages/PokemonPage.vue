<template>
  <div class="poke-game">
    
    <div v-if="!pokemonArr.length" class="gen-selector">
        <h2>Selecciona tu Generación</h2>
        <button @click="mixPokemonArray('kanto')">Kanto (Gen 1)</button>
        <button @click="mixPokemonArray('johto')">Johto (Gen 2)</button>
        <button @click="mixPokemonArray('all')">Todas</button>
    </div>

    <PokemonSkeleton v-else-if="!pokemon" />

    <div v-else>
       <h1>¿Quién es este pokemon?</h1>
       
       <PokemonPicture 
          :pokemonId="pokemon.id" 
          :showPokemon="showPokemon"
          :image="pokemon.img" 
       />
       
       <PokemonOptions 
          :pokemons="pokemonArr" 
          :answerId="pokemon.id" 
          @selection="checkAnswer"
       />

       <template v-if="showAnswer">
         <h2 class="fade-in">{{ message }}</h2>
         <button @click="newGame">Siguiente Pokémon</button>
       </template>
    </div>

  </div>
</template>

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
        score:0,
        currentGen: null
      }
    },
    methods:{
 async mixPokemonArray(gen = 'all') {
    this.currentGen = gen; // Guardamos la gen elegida
    this.pokemon = null;
    this.pokemonArr = await getPokemonOptions(gen);
   
    const rndInt = Math.floor(Math.random() * 4);
    this.pokemon = this.pokemonArr[rndInt];
},
     checkAnswer(selectedId) {
    this.showPokemon = true;
    this.showAnswer = true;

    if (selectedId === this.pokemon.id) {
      this.message = `Correcto, ${this.pokemon.name}`;
      this.score++; // <-- Suma un punto si acierta
    } else {
      this.message = `Lo lamento!! era ${this.pokemon.name}`;
      this.score = 0; // <-- Opcional: Reinicia el contador si falla
    }

    if (this.pokemon.cry) {
      const audio = new Audio(this.pokemon.cry);
      audio.volume = 0.5; // Volumen al 50% para no asustar al usuario
      audio.play();
    }

    if (selectedId === this.pokemon.id) {
      this.message = `¡Correcto, ${this.pokemon.name}!`;
      this.score++;
    } else {
      this.message = `¡Lo lamento! Era ${this.pokemon.name}`;
      this.score = 0;
    }
  },
        
      newGame(){

        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
       // Llamamos a la mezcla usando la última generación guardada
    // this.mixPokemonArray(this.currentGen);

      }
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