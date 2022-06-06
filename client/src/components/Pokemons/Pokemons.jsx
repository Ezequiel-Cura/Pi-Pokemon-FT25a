import React from 'react'
import PokemonCard from '../PokemonCard/PokemonCard'
import styles from "./Pokemons.module.css"
import confused_pikachu from "../../multimedia/confuse_pikachu.png"

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
        <div className={styles.error_cointainer}>
          <h1 className={styles.error_text}>No se encontro el pokemon</h1>
          <img src={confused_pikachu} alt="" />
        </div>
      }
    </>
  )
}
