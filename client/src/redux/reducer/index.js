
import {GET_ALL_POKEMONS,GET_POKEMON,CREATE_POKEMON,DELETE_POKEMON} from '../actions'



const initialState = {
  pokemons : [],
  poke : {}
};


const rootReducer = (state = initialState,action)=> {
  switch(action.type){
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }
    default:
      return state
  }
}


export default rootReducer;

// BUSCAR CLASE DE DIEGO EN DONDE EL REDUCER LO HACE DE LA MANERA MAS EFICIENTE