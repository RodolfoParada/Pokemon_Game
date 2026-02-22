<template>
  <div class="options-container">
    <ul>
      <li 
        v-for="pokemon in pokemons" 
        :key="pokemon.id"
        @click="onSelect(pokemon.id)"
        :class="{
          'text-correct': selectedId === pokemon.id && pokemon.id === answerId,
          'text-incorrect': selectedId === pokemon.id && pokemon.id !== answerId,
          'disabled': selectedId !== null
        }"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: { type: Array, required: true },
    answerId: { type: Number, required: true } // ID del pokemon correcto
  },
  data() {
    return {
      selectedId: null
    }
  },
  methods: {
    onSelect(id) {
      if (this.selectedId !== null) return;
      this.selectedId = id;
      this.$emit('selection', id);
    }
  },
  watch: {
    // Limpia la selección cuando el juego se reinicia
    pokemons() {
      this.selectedId = null;
    }
  }
}
</script>

<style scoped>
/* Mantienes tus estilos base iguales */
.options-container {
    display: flex;
    justify-content: center;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    padding: 5px;
    transition: all 0.3s; /* Suaviza el cambio de color */
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

/* --- Nuevas clases para los textos --- */
.text-correct {
    color: #2e7d32; /* Verde oscuro para legibilidad */
    font-weight: bold;
    border-color: #2e7d32; /* Opcional: el borde también cambia sutilmente */
}

.text-incorrect {
    color: #d32f2f; /* Rojo oscuro */
    font-weight: bold;
    border-color: #d32f2f;
}

.disabled {
    pointer-events: none; /* Evita clics extra */
}
</style>