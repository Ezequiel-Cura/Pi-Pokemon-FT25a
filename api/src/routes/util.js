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

module.exports = {
  getPokeApi,
  getPokeDb,
  getAllPoke,
  getAllTypesApi,
  getAllTypesDb
}



// const getPokeApi = async () => {
  
//   const poke1 = await axios("https://pokeapi.co/api/v2/pokemon")
//   // const poke1 = fetch("https://pokeapi.co/api/v2/pokemon%22).then(r => r.json())
//   const poke2 = await axios(poke1.data.next)
//   // const poke2 = fetch(poke1.data.next).then(r => r.json())
//   const pokeData = poke1.data.results.concat(poke2.data.results)
//   // const pokeData = poke1.results.concat(poke2.results) y abajo directamente sacaría la parte de data
//   console.log("pokeData", pokeData)
//   const pokemon = await Promise.all(pokeData.map(async poke => {
//       let pDetail = await axios(poke.url)
//         return {
//           id: pDetail.data.id,
//             name: pDetail.data.name,
//             image: pDetail.data.sprites.other.home.front_default,
//             type: pDetail.data.types.map(t => t.type.name),
//             hp: pDetail.data.stats[0].base_stat,
//             attack: pDetail.data.stats[1].base_stat,
//             defense: pDetail.data.stats[2].base_stat,
//             speed: pDetail.data.stats[5].base_stat,
//             height: pDetail.data.height, 
//             weight: pDetail.data.weight
//       }
//   }))
//   return pokemon;

// }