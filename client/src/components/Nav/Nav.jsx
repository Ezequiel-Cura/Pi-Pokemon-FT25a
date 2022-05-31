import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import logo from "../../multimedia/a6078c-2fd9033b2be04c9b947d1aac6cdaef60-a2551.webp"
import { Link } from 'react-router-dom'



export default function Nav() {
  return (
    <div className='nav'>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <Link to="/home/createPokemon"><button>CreatePokemon</button></Link>
      </div>
      <div>
        <SearchBar />
      </div>
      
    </div>
  )
}
