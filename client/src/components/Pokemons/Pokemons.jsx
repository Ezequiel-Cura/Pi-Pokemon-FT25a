import React from 'react'
import PokemonCard from '../PokemonCard/PokemonCard'

export default function Pokemons({state}) {
  return (
    <>
      { state.length !== 0  && !state[0].error ? 
        state?.map((poke)=>(
          <PokemonCard 
            key={poke.id}
            id={poke.id}
            name={poke.name}
            attack={poke.attack}
            image={poke.image}
            types={poke.types}
          />
        ))
        :
        <div>
          <h1 style={{color: "#FFF"}}>No se encontro el pokemon</h1>
        </div>
      }
    </>
  )
}
