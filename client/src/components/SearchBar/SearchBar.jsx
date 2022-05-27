import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { getPokemonByName } from '../../redux/actions';

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name,setName] = useState("");

  function handleChange(e){
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getPokemonByName(name))
    setName("")
  }
  return (
    <div>
      <span>Busca tu pokemon</span>
      <input 
        placeholder='pokemon...'
        type="text"
        value={name}
        onKeyPress={e => e.key === 'Enter' && handleSubmit(e) }
        onChange={e=>handleChange(e)}
      />
      <button type='submit' onClick={e=>handleSubmit(e)}>Buscar</button>
    </div>
  )
}
