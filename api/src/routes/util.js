const axios = require('axios')
const {Pokemon,Type} = require('../db')


const getPokeApi = async()=>{
  try {
    const poke1 = await axios("https://pokeapi.co/api/v2/pokemon")
    const poke2 = await axios(poke1.data.next)
    const data = poke1.data.results.concat(poke2.data.results)
    const pokemons = await Promise.all(data.map(async(elem)=>{
      let pokeDetail = await axios(elem.url);
      return {
        id: pokeDetail.data.id,
        name: pokeDetail.data.name,
        image: pokeDetail.data.sprites.other.home.front_default,
        type: pokeDetail.data.types.map(t => t.type.name),
        hp: pokeDetail.data.stats[0].base_stat,
        attack: pokeDetail.data.stats[1].base_stat,
        defense: pokeDetail.data.stats[2].base_stat,
        speed: pokeDetail.data.stats[5].base_stat,
        height: pokeDetail.data.height, 
        weight: pokeDetail.data.weight
      }
    }))
    return pokemons
  } catch (error) {
    next(error)
  }
}

const getPokeDb = async()=>{
  return await Pokemon.findAll({
    include:{
      model : Type,
      attributes : ['name'],
      through:{
        attributes:[]
      }
    }
  })
}

const getAllPoke = async()=>{
  const apiInfo = await getPokeApi();
  const dbInfo = await getPokeDb();
  const allInfo = apiInfo.concat(dbInfo) // [...apiInfo,...dbInfo]
  return allInfo
}

const getAllTypesApi = async()=>{
  const results = await axios("https://pokeapi.co/api/v2/type")
  const types = await results.data.results.map((el)=>{
     return {
       name : el.name
     }
  })

  return types
}

const getAllTypesDb = async()=>{
  const types = Type.findAll({
    attributes:["name"]
  })
  return types
}

const getPokemon = async(id)=>{
  const thePokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
  const pokeData = thePokemon.data
  // console.log(pokeData.name)
  const pokemon= {
    id:     pokeData.id,
    name:   pokeData.name,
    image:  pokeData.sprites.other.home.front_default,
    type:   pokeData.types.map(t => t.type.name),
    hp:     pokeData.stats[0].base_stat,
    attack: pokeData.stats[1].base_stat,
    defense:pokeData.stats[2].base_stat,
    speed:  pokeData.stats[5].base_stat,
    height: pokeData.height, 
    weight: pokeData.weight
  }
  // console.log(pokemon)
  return pokemon
}

const getPokeByName = async(name)=>{
  const pokemonName = await axios("https://pokeapi.co/api/v2/pokemon/" + name);
  const pokeData = pokemonName.data
  // console.log(pokeData.name)
  const pokemon= {
    id:     pokeData.id,
    name:   pokeData.name,
    image:  pokeData.sprites.other.home.front_default,
    type:   pokeData.types.map(t => t.type.name),
    hp:     pokeData.stats[0].base_stat,
    attack: pokeData.stats[1].base_stat,
    defense:pokeData.stats[2].base_stat,
    speed:  pokeData.stats[5].base_stat,
    height: pokeData.height, 
    weight: pokeData.weight
  }
  // console.log(pokemon)
  return pokemon
}


module.exports = {
  getPokeApi,
  getPokeDb,
  getAllPoke,
  getAllTypesApi,
  getAllTypesDb,
  getPokemon,
  getPokeByName
}

