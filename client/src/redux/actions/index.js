export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS'
export const GET_POKEMON = 'GET_POKEMON'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const DELETE_POKEMON = 'DELETE_POKEMON'
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME'
export const GET_TYPES = 'GET_TYPES'
export const FILTER_BY_STATUS = 'FILTER_BY_STATUS'
export const RESET_FILTERS = 'RESET_FILTERS';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const FILTER_BY_API_DB = 'FILTER_BY_API_DB'

export const getAllPokemons = ()=>dispatch =>{
  return fetch("http://localhost:3001/pokemons")
    .then(respo=>respo.json())
    .then(json=>{
      dispatch({type:GET_ALL_POKEMONS,payload:json})
    })
}


export const getPokemon = (id)=>dispatch=>{
  return fetch("http://localhost:3001/pokemons/" + id)
    .then(res=> res.json())
    .then(json=> {
      dispatch({type:GET_POKEMON,payload:json})
    })
}

export const getPokemonByName = (name) => dispatch=>{
  return fetch("http://localhost:3001/pokemons?name=" + name)
    .then(res=>res.json())
    .then(json=>{
      dispatch({type:GET_POKEMON_BY_NAME , payload:json})
    })
}

export const getTypes = () => dispatch =>{
  return fetch("http://localhost:3001/types")
    .then(res=> res.json())
    .then(json=>{
      dispatch({type:GET_TYPES  , payload:json})
    })
}

export const filterByStatus = (status) =>{
  // return fetch("http://localhost:3001/pokemons?status=" + status)
//     .then(respo=>respo.json())
//     .then(json=>{
//       dispatch({type:FILTER_BY_STATUS,payload:json})
//     })
  return {
    type: FILTER_BY_STATUS,payload: status
  }
}

export const filterByType= (type)=>{
  return {
    type: FILTER_BY_TYPE,payload:type
  }
}

export const filterApiDb = (status)=>{
  return{
    type: FILTER_BY_API_DB, payload:status
  }
}

export const resetFilters=()=>{
  return {
    type: RESET_FILTERS, payload: []
  }
}



export const createPokemon = async(obj)=>{
  await fetch("http://localhost:3001/pokemons",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}

export const deletePokemon = ()=>{
  
}