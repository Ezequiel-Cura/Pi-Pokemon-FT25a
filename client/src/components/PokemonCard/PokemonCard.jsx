import React from 'react'
import { Link } from 'react-router-dom'

export default function CardPokemon(props) {
  return (
    <div>
      <img src={`${props.image}`} alt="" />
      <Link to={`/home/${props.id}`}>
        {props.name}
      </Link>
      <div><span>{props.type}</span></div>
    </div>
  )
}
