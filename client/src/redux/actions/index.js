export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS'
export const GET_POKEMON = 'GET_POKEMON'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const DELETE_POKEMON = 'DELETE_POKEMON'



export const getAllPokemons = ()=>dispatch =>{
  return fetch("http://localhost:3001/pokemons")
    .then(respo=>respo.json())
    .then(json=>{
      dispatch({type:GET_ALL_POKEMONS,payload:json})
    })
}


export const getPokemon = ()=>{

}


export const createPokemon = ()=>{

}

export const deletePokemon = ()=>{
  
}