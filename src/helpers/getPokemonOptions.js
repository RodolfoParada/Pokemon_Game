import pokemonApi from "@/api/pokemonApi"

const getPokemons = () => {
    const pokemonArr = Array.from(Array(1000))
    return pokemonArr.map(( _ , index ) => index + 1)
}

const getPokemonOptions = async() => {
    
   
    const mixedPokemons = getPokemons()
                           .sort( () => Math.random() - 0.5)
   
    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4) )
   
    return pokemons
}

const getPokemonNames = async( [a,b,c,d] = [] ) => {
 
    const promiseArr = [
        pokemonApi.get(`/${ a } `),
        pokemonApi.get(`/${ b } `),
        pokemonApi.get(`/${ c } `),
        pokemonApi.get(`/${ d } `),
]

const [p1,p2,p3,p4 ] = await Promise.all(promiseArr)

return [
  

    { name: p1.data.name, id: p1.data.id, cry: p1.data.cries.latest },
    { name: p2.data.name, id: p2.data.id, cry: p2.data.cries.latest },
    { name: p3.data.name, id: p3.data.id, cry: p3.data.cries.latest },
    { name: p4.data.name, id: p4.data.id, cry: p4.data.cries.latest },
]


}
export default getPokemonOptions