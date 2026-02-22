import axios from 'axios';

const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
});

// Agregamos un método para obtener la data de un Pokémon por ID
export const getPokemonData = async (id) => {
    const { data } = await pokemonApi.get(`/${id}`);
    return {
        id: data.id,
        name: data.name,
        // Usamos Official Artwork (Alta Calidad)
        img: data.sprites.other['official-artwork'].front_default,
        cry: data.cries?.latest
    };
};

export default pokemonApi;