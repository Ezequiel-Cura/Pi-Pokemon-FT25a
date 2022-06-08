
import {
  GET_ALL_POKEMONS,
  GET_POKEMON,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  FILTER_BY_STATUS,
  RESET_FILTERS,
  FILTER_BY_TYPE,
  FILTER_BY_API_DB,
  RESET_DETAIL
} from '../actions'


const initialState = {
  pokemons : [],
  filteredPokemons:[],
  poke : {},
  types:[]
  
};


const rootReducer = (state = initialState,action)=> {
  switch(action.type){
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload
      }
    case GET_POKEMON:
      return{
        ...state,
        poke: action.payload
      }
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        filteredPokemons:[action.payload]
      }
    case GET_TYPES:
      return {
        ...state,
        types:action.payload
      }
    case FILTER_BY_STATUS:
      const allPokemons = state.filteredPokemons.map((e)=> e);
      let filterPokemons = [];
      if(action.payload === "asc"){
        filterPokemons = allPokemons.sort((a,b)=>{
          if(a.name.toLowerCase() > b.name.toLowerCase())return 1;
          if(a.name.toLowerCase() < b.name.toLowerCase())return -1;
          return 0;
        })
      }
      if(action.payload === "des"){
        filterPokemons = allPokemons.sort((a,b)=>{
          if(a.name.toLowerCase() < b.name.toLowerCase())return 1;
          if(a.name.toLowerCase() > b.name.toLowerCase())return -1;
          return 0;
        })
      }
      if(action.payload === "attack"){
        filterPokemons = allPokemons.sort((a,b)=>
          b.attack - a.attack
        )
      }
      if(action.payload === "default"){
        filterPokemons = allPokemons.sort((a,b)=>{
          if(a.id > b.id)return 1;
          if(a.id < b.id)return -1;
          return 0;
        })
      }
      return{
        ...state,
        filteredPokemons:filterPokemons,
        // pokemons:filterPokemons
      }
    case FILTER_BY_TYPE:    
      let pokeTypes= state.pokemons.map((e)=> e);
      if(action.payload !== "typeDefault"){
        pokeTypes = state.pokemons.filter((poke)=> poke.types.includes(action.payload))
      }
      
      return{
        ...state,
        filteredPokemons: pokeTypes
      }
    case FILTER_BY_API_DB:
      // let pokeDb_Api = state.pokemons.map((e)=> e)

      // if(action.payload === "Db"){
      //   pokeDb_Api = state.pokemons.filter(p=> typeof p.id === "string" )
      // }
      // if(action.payload === "Api"){
      //   pokeDb_Api = state.pokemons.filter(p=> typeof p.id === "number" )
      // }
      return {
        ...state,
        pokemons:action.payload,
        filteredPokemons: action.payload
      }
    case RESET_FILTERS:
      return {
        ...state,
        pokemons:action.payload,
        filteredPokemons: action.payload
      }
    case RESET_DETAIL:
      return{
        ...state,
        poke: action.payload
      }
    default:
      return state
  }
}


export default rootReducer;

