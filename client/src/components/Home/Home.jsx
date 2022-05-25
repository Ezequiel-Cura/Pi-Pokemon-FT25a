import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Nav from "../Nav/Nav"
import { getAllPokemons } from '../../redux/actions'
import PokemonCard from "../PokemonCard/PokemonCard"




export default function Home() {
  const dispatch = useDispatch()
  const currentPokemons = useSelector(state => state.pokemons)

  useEffect(()=>{
    dispatch(getAllPokemons())
  })

  return (
    <div className='home'>
      <Nav />

      <div>
        <h4>Filtros</h4>
        <select name="" id="">
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select name="" id="">
          <option value="">All Pokemon</option>
          <option value="">Api Pokemon</option>
          <option value="">Db Pokemon</option>
        </select>
      </div>
      <div>
        {
          currentPokemons.length > 0 ? 
          currentPokemons.map((poke)=>(
            <PokemonCard 
              key={poke.id}
              id={poke.id}
              name={poke.name}
              attack={poke.attack}
              image={poke.image}
              type={poke.type}
            />
          )):
            (
              <div>
                <img src="../../multimedia/pikachu.gif" alt="loading" />
              </div>
            )
        
          }
      </div>
    </div>
  )
}
