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
export const RESET_DETAIL = 'RESET_DETAIL'


export const getAllPokemons = ()=>dispatch =>{
  try {
    return fetch("http://localhost:3001/pokemons")
      .then(respo=>respo.json())
      .then(json=>{
        dispatch({type:GET_ALL_POKEMONS,payload:json})
      })
    
  } catch (error) {
    alert(error)
  }
}


export const getPokemon = (id)=>dispatch=>{
  
  try {
    return fetch("http://localhost:3001/pokemons/" + id)
      .then(res=> res.json())
      .then(json=> {
        dispatch({type:GET_POKEMON,payload:json})
      })
  } catch (error) {
    alert(error)
  }
}

export const getPokemonByName = (name) => dispatch=>{
  console.log(name)
  try {
    return fetch("http://localhost:3001/pokemons?name=" + name)
      .then(res=>res.json())
      .then(json=>{
        dispatch({type:GET_POKEMON_BY_NAME , payload:json})
      })
  } catch (error) {
    alert(error.error)
  }
}

export const getTypes = () => dispatch =>{
  try {
    return fetch("http://localhost:3001/types")
      .then(res=> res.json())
      .then(json=>{
        dispatch({type:GET_TYPES  , payload:json})
      })
  } catch (error) {
    alert(error)
  }
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

export const resetDetail = () =>{
  return {
    type : RESET_DETAIL,payload : {}
  }
}


export const createPokemon = (obj)=>{
  console.log(obj)
  return function(){
    try {
      return fetch("http://localhost:3001/pokemons",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
    } catch (error) {
      console.log(error.message)
      
    }

  }
}

export const deletePokemon = (id)=>{
  return function(){
    return fetch("http://localhost:3001/pokemons/delete/" + id,{
      method:'DELETE'
    })
  }
}