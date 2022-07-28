import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { getPokemonByName } from '../../redux/actions';
import styles from "./SearchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name,setName] = useState("");

  function handleChange(e){
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(name !== ""){
      dispatch(getPokemonByName(name))
    }
    setName("")
  }
  return (
    <div className={styles.searchBar}>
      <span>Search your pokemon</span>
      <div>
        <input 
          placeholder='pokemon...'
          type="text"
          value={name}
          onKeyPress={e => e.key === 'Enter' && handleSubmit(e) }
          onChange={e=>handleChange(e)} className={styles.button_4}
        />
        <button type='submit' onClick={e=>handleSubmit(e)} className={styles.button_4}>Search</button>
      </div>
    </div>
  )
}
