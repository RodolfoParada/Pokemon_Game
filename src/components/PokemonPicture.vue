<template>
   <div class="pokemon-container">
      <img :src="image" 
         class="hidden-pokemon"
         alt="pokemon"> 

       <img v-if="showPokemon"
          :src="image" 
          class="fade-in"
          alt="pokemon"> 
   </div>
</template>

<script>
export default {
    props: {
        pokemonId: { type: Number, required: true },
        showPokemon: { type: Boolean, required: true },
        image: { type: String, required: true } // Esta es la URL de alta calidad
    }
    // Eliminamos computed: imgSrc ya que no la necesitamos
}
</script>

<style scoped>
.pokemon-container {
    height: 200px;
    display: flex;
    justify-content: center; /* Centrado profesional con Flexbox */
    position: relative;
    width: 100%;
}

img {
    height: 200px;
    position: absolute;
    /* Eliminamos right: 32% para que el centrado de arriba funcione */
    user-select: none;
    -webkit-user-drag: none;
}

.hidden-pokemon {
    filter: brightness(0);
}
</style>