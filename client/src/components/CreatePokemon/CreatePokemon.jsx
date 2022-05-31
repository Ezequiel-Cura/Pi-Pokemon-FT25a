import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPokemon } from '../../redux/actions' 
import {Link} from "react-router-dom"

export default function CreatePokemon() {
  const dispatch = useDispatch()
  const [inputs,setInputs] = useState({
    name:"",
    hp: 0,
    attack:0,
    defense:0,
    speed:0,
    height:0,
    weight:0,
    image:""
  })
  function handleChange(e){
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
    
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(createPokemon(inputs))
  }
  return (
    <div>
      <div>
        <h4>Create your Pokemon</h4>
      </div>
      <div>
        <Link to="/home"><button>return Home</button></Link>
      </div>
      <div>
        <form action="" onChange={e=>handleChange(e)} onSubmit={handleSubmit}>
          <label htmlFor="">Name: </label>
          <input type="text" name='name'/>

          <label htmlFor="">Hp: </label>
          <input type="text" name='hp'/>

          <label htmlFor="">Attack: </label>
          <input type="text" name='attack'/>

          <label htmlFor="">Defense: </label>
          <input type="text" name='defense'/>

          <label htmlFor="">Speed: </label>
          <input type="text" name='speed'/>

          <label htmlFor="">Height: </label>
          <input type="text" name='height'/>

          <label htmlFor="">Weight: </label>
          <input type="text" name='weight'/>

          <label htmlFor="">Image: </label>
          <input type="text" name="image"/>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
