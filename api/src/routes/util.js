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
        types: pokeDetail.data.types.map(t => t.type.name),
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
    throw error
  }
}

const getPokeDb = async()=>{
  const pokeDB= await Pokemon.findAll({
    include:{
      model : Type,
      attributes : ['name'],
      through:{
        attributes:[]
      }
    }
  })
  const pokemons = pokeDB.map(p=>{
    return {
      ...p.dataValues,
      types: p.types?.map(t=> t.name)
    }
  })
  // console.log(pokemons[0].types)
  return pokemons
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
  try {
    if(isNaN(id)){
      console.log(id)
      // let pokeId = await Pokemon.findByPk(id)
      let pokeId = await Pokemon.findOne({
        where:{id:id},
        include:{
          model : Type,
          attributes : ['name'],
          through:{
            attributes:[]
          }
        }
      })
      
      if(pokeId){
        const filterTypesPoke = {
          ...pokeId.dataValues,
          types: pokeId.types?.map(t=> t.name)
        }
        const pokemondb ={
          id: filterTypesPoke.id,
          name: filterTypesPoke.name,
          image:filterTypesPoke.image,
          types:filterTypesPoke.types,
          hp:filterTypesPoke.hp,
          attack:filterTypesPoke.attack,
          defense:filterTypesPoke.defense,
          speed:filterTypesPoke.speed,
          height:filterTypesPoke.height,
          weight:filterTypesPoke.weight
        }
        console.log("DB POKEMON: ",pokemondb)
        return pokemondb
      } 

    }
    const thePokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
    const pokeData = thePokemon.data
    // console.log(pokeData.name)
    const pokemon= {
      id:     pokeData.id,
      name:   pokeData.name,
      image:  pokeData.sprites.other.home.front_default,
      types:   pokeData.types.map(t => t.type.name),
      hp:     pokeData.stats[0].base_stat,
      attack: pokeData.stats[1].base_stat,
      defense:pokeData.stats[2].base_stat,
      speed:  pokeData.stats[5].base_stat,
      height: pokeData.height, 
      weight: pokeData.weight
    }
    // console.log(pokemon)
    return pokemon
    
  } catch (error) {
    console.log( error.message)
  }
}

const getPokeByName = async(name)=>{
  try {
    let pokeNameDb = await Pokemon.findOne({
      where:{name:name},
      include:{
        model : Type,
        attributes : ['name'],
        through:{
          attributes:[]
        }
      }
    })
    if(pokeNameDb){
      const filterTypesPoke = {
        ...pokeNameDb.dataValues,
        types: pokeNameDb.types?.map(t=> t.name)
      }
      const pokemon ={
        id: filterTypesPoke.id,
        name: filterTypesPoke.name,
        image:filterTypesPoke.image,
        types:filterTypesPoke.types,
        hp:filterTypesPoke.hp,
        attack:filterTypesPoke.attack,
        defense:filterTypesPoke.defense,
        speed:filterTypesPoke.speed,
        height:filterTypesPoke.height,
        weight:filterTypesPoke.weight
      }
      console.log("DB POKEMON: ",pokemon)
      return pokemon
    } 
    const pokemonName = await axios("https://pokeapi.co/api/v2/pokemon/" + name);
    console.log(pokemonName)
    const pokeData = pokemonName.data
    const pokemon= {
      id:     pokeData.id,
      name:   pokeData.name,
      image:  pokeData.sprites.other.home.front_default,
      types:   pokeData.types.map(t => t.type.name),
      hp:     pokeData.stats[0].base_stat,
      attack: pokeData.stats[1].base_stat,
      defense:pokeData.stats[2].base_stat,
      speed:  pokeData.stats[5].base_stat,
      height: pokeData.height, 
      weight: pokeData.weight
    }
    return pokemon
  } catch (error) {
    console.log( new Error("No se encontro el pokemon"))
  }
  
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

