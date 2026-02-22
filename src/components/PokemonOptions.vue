<template>
    <div class="options-container">
      <ul>
        <li v-for="pokemon in pokemons" 
            :key="pokemon.id"
            @click="onSelect(pokemon.id)"
            @:class="[
          'option-item', 
          { 
            'correct': selectedId === pokemon.id && pokemon.id === answerId,
            'incorrect': selectedId === pokemon.id && pokemon.id !== answerId,
            'disabled': selectedId !== null
          }
        ]"
            
            >
            {{ pokemon.name }}
        </li>
       
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pokemons: {
        type: Array,
        required:true
      },
      answerId: { 
        type: Number,
         required: true
      }
    },
data() {
    return {
      selectedId: null // Guardamos cuál clickeó el usuario
    }
  },
  methods: {
    onSelect(id) {
      if (this.selectedId !== null) return; // Evita múltiples clics
      this.selectedId = id;
      this.$emit('selection', id);
    }
  },
  watch: {
    // Si los pokemons cambian (Nuevo Juego), reseteamos el seleccionado
    pokemons() {
      this.selectedId = null;
    }
  }

  
  }
  </script>
  
  <style scope>

  .options-container {
    display: flex;
    justify-content: center;
    margin-top: -15%;
     }
  ul {
    list-style-type: none; 
    margin-top: 17%;
  }
 
  li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    
  }

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}


  
  </style>