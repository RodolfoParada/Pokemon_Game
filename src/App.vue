<template>
  <PokemonPage />

</template>

<script>

import PokemonPage from './pages/PokemonPage';


export default {
  name: 'App',
  components: {

    PokemonPage
}
}
</script>

<style>
/* En App.vue */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* Elimina el margin-top: 60px si quieres usar toda la pantalla */
  margin-top: 0px; 
  max-width: 100vw; /* Ocupa el 100% del ancho de la ventana */
  min-height: 50vw;
}
</style>
