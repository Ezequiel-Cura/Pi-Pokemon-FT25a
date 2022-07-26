import dotenv from "dotenv"
dotenv.config()

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

const {REACT_APP_BACK_URL} = process.env


export const getAllPokemons = ()=>dispatch =>{
  try {
    return fetch(`${REACT_APP_BACK_URL}/pokemons`)
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
    return fetch(`${REACT_APP_BACK_URL}/pokemons/` + id)
      .then(res=> res.json())
      .then(json=> {
        dispatch({type:GET_POKEMON,payload:json})
      })
  } catch (error) {
    alert(error)
  }
}

export const getPokemonByName = (name) => dispatch=>{
  try {
    return fetch(`${REACT_APP_BACK_URL}/pokemons?name=` + name)
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
    return fetch(`${REACT_APP_BACK_URL}/types`)
      .then(res=> res.json())
      .then(json=>{
        dispatch({type:GET_TYPES  , payload:json})
      })
  } catch (error) {
    alert(error)
  }
}

export const filterByStatus = (status) =>{
  
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
  return function(dispatch){
    return fetch(`${REACT_APP_BACK_URL}/pokemons?status=` + status)
      .then(respo=>respo.json())
      .then(json=>{
        dispatch({type:FILTER_BY_API_DB,payload:json})
      })
  }
  // return{
  //   type: FILTER_BY_API_DB, payload:status
  // }
}

export const resetFilters=()=>dispatch=>{
  return fetch(`${REACT_APP_BACK_URL}/pokemons`)
      .then(respo=>respo.json())
      .then(json=>{
        dispatch({type:RESET_FILTERS,payload:json})
      })
  // return {
  //   type: RESET_FILTERS, payload: []
  // }
}

export const resetDetail = () =>{
  return {
    type : RESET_DETAIL,payload : {}
  }
}


export const createPokemon = (obj)=>{
  return function(){
    try {
      return fetch(`${REACT_APP_BACK_URL}/pokemons`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
    } catch (error) {
      
      
    }
  }
}

export const deletePokemon = (id)=>{
  return function(){
    return fetch(`${REACT_APP_BACK_URL}/pokemons/delete/` + id,{
      method:'DELETE'
    })
  }
}

export const updatePokemon = (id,data)=>{
  
  return function(){
    return fetch(`${REACT_APP_BACK_URL}/pokemons/put/` + id,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },// no me llegaba el body al back por que no habia puesto el headers
      body: JSON.stringify(data)
    })
  }
}