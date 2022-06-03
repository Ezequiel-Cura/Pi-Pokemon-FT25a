import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import logo from "../../multimedia/a6078c-2fd9033b2be04c9b947d1aac6cdaef60-a2551.webp"
import { Link } from 'react-router-dom'
import styles from "./Nav.module.css"


export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.nav_item}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.nav_item}>
        <Link to="/home/createPokemon"><button>CreatePokemon</button></Link>
      </div>
      <div className={styles.nav_item}>
        <SearchBar />
      </div>
      
    </div>
  )
}
