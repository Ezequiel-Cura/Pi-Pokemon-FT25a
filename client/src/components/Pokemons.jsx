import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import "./styles/Pokemons.css"
import CardPokemon from "./CardPokemon"

import { getAllPokemons } from '../redux/actions'

export default function Pokemons(props) {
  const dispatch = useDispatch()

  let pokemons = useSelector(state => state.pokemons)

  useEffect(()=>{
    dispatch(getAllPokemons())
  },[dispatch])

  return (
    <div>
      <div>BIENVENDIO A POKEMONS</div>
      <div>
        {pokemons && pokemons.map((poke)=>(
          <CardPokemon 
            key={poke.id}
            id={poke.id}
            name={poke.name}
            attack={poke.attack}
            image={poke.image}
          />
        ))}
        
      </div>
    </div>
  )
}
