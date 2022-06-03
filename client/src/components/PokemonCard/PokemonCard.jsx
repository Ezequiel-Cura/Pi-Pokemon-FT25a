import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./PokemonCard.module.css"

export default function PokemonCard(props) {
 
  return (
    <div className={styles.pokeCard}>
      <div className={styles.img_cointainer}>
        <img src={props.image} alt="poke" />
      </div>
      <div>
        <Link to={`/home/` + props.id}>
          {props.name.toUpperCase()}
        </Link>
      </div>
      <div className={styles.pokeTypes}>
        <span >Types: {props.types.length > 0 ? props.types.join(" - ") : props.types }</span>
      </div>
      <div className={styles.pokeAttack}>
        <span>Attack: {props.attack}</span></div>    

    </div>
  )
}


/*
TAB: DESPLAZAMIENTO HACIA LA DERECHA
SHIFT + TAB : DESPLAZAMIENTO HACIA LA IZQUIERDA

COPIAR CODIGO DE WILLY

*/