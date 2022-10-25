<template>

    <h1 v-if="!pokemon">Espere por favor...</h1>


 <div v-else>
   <h1>¿Quién es este pokemon?</h1>

  <!--pokemonId lo recibe props de en PokemonId-->
  <PokemonPicture  :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
  <PokemonOptions
            :pokemons="pokemonArr "
            @selection="checkAnswer"
            />

      <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>

       <button @click="newGame">
        Nuevo Juego
        </button>
      </template>

 </div>


</template>

<script>


import PokemonPicture from '@/components/PokemonPicture';
import PokemonOptions from '@/components/PokemonOptions';

import getPokemonOptions from '@/helpers/getPokemonOptions';
// import { threadId } from 'worker_threads';

console.log(getPokemonOptions())


export default {
    components: { PokemonPicture, PokemonOptions },
    data() {
      return {
        pokemonArr:[] ,
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message:''
      }
    },
    methods:{
     async mixPokemonArray() {
         this.pokemonArr = await getPokemonOptions()
       
         const rndInt = Math.floor( Math.random() * 4 )
         this.pokemon = this.pokemonArr[rndInt]
     
      },
      checkAnswer(selectedId ){
        this.showPokemon = true
        this.showAnswer = true

        if(selectedId === this.pokemon.id) {
          this.message = `Correcto, ${this.pokemon.name }`
       
       }else{
        this.message =`Lo lamento!! intentalo otra vez` 
          
        }
      },
      newGame(){

        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
        this.mixPokemonArray()

      }
    },
   mounted(){
      this.mixPokemonArray()
      }



    }


</script>

<style>

</style>