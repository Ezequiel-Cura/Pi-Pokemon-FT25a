import React from 'react'
import { Link } from 'react-router-dom'


export default function PokemonCard(props) {
 
  return (
    <div>
      <img src={props.image} alt="poke" />
      <Link to={`/home/` + props.id}>
        {props.name}
      </Link>
      <div><span>{props.type.length > 0 ? props.type.join(" , "): props.type }</span></div>
    </div>
  )
}


/*


*/