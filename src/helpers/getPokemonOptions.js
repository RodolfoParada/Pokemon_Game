import { getPokemonData } from "@/api/pokemonApi";

// 1. Definimos las constantes de las generaciones (Escalabilidad)
export const GENERATIONS = {
    all:   { min: 1, max: 650 },
    kanto: { min: 1, max: 151 },
    johto: { min: 152, max: 251 },
    hoenn: { min: 252, max: 386 }
};

// 2. Función para crear el arreglo de IDs basado en el rango
const getPokemons = (min, max) => {
    const length = max - min + 1;
    const pokemonArr = Array.from(Array(length));
    return pokemonArr.map((_, index) => index + min);
}

// 3. Función principal que exportamos
const getPokemonOptions = async (gen = 'all') => {
    // Obtenemos min y max según la generación elegida
    const { min, max } = GENERATIONS[gen] || GENERATIONS.all;
    
    // Generamos y mezclamos los IDs
    const mixedPokemons = getPokemons(min, max)
                           .sort(() => Math.random() - 0.5);
   
    // Tomamos los primeros 4 y buscamos sus nombres/datos
    return await getPokemonNames(mixedPokemons.splice(0, 4));
}

// 4. Función que realiza las peticiones simultáneas
const getPokemonNames = async ([a, b, c, d] = []) => {
    // Aquí usamos la función especializada que definimos en pokemonApi.js
    const promiseArr = [
        getPokemonData(a),
        getPokemonData(b),
        getPokemonData(c),
        getPokemonData(d),
    ];

    // Promise.all espera a que las 4 peticiones terminen
    return await Promise.all(promiseArr);
}

export default getPokemonOptions;