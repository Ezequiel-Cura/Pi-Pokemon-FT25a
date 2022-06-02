import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPokemon,getAllPokemons,getTypes } from '../../redux/actions' 
import {Link} from "react-router-dom"
import Validate from './Validator'



export default function CreatePokemon() {
  const dispatch = useDispatch()

  const [changes,setChanges] = useState(0)
  const [boolean,setBoolean] = useState(false)
  const [errors,setErrors] = useState({})
  const [input,setInputs] = useState({
    name:"",
    hp : "",
    attack: "",
    defense:"",
    speed:"",
    height:"",
    weight:"",
    image:"",
    types:[]
  })

  const types = useSelector(state=> state.types)
  const allPokemons = useSelector(state=>state.pokemons)
  useEffect(()=>{
    dispatch(getTypes())
    dispatch(getAllPokemons())
  },[dispatch])


  useEffect(()=>{
    setErrors(Validate(input,allPokemons))
  },[changes])//eslint-disable-line


  function handleChange({target}){
    setInputs({
      ...input,
      [target.name]: target.value
    })
    setChanges(changes + 1)
    // console.log(changes)
    // console.log(input)
    // setErrors(Validate({
    //   ...input,
    //   [target.name] : target.value
    // },allPokemons))
  }

  function handleChangeTypes(e){
    if(input.types.length <=1){
      setInputs({
        ...input,
        types: [...input.types,e.target.value]
      })
    }
    setChanges(changes + 1)
    // setErrors(Validate(input))
  }

  function handleSubmit(e){
    e.preventDefault()
    
    // setErrors(Validate({
    //   ...input,
    //   [e.target.name] : e.target.value
    // },allPokemons))

    // console.log("ERRORES",Object.keys(errors).length,errors)
    if(Object.keys(errors).length === 0){
      // console.log("ENTRE AL DISPATCH")
      dispatch(createPokemon(input))
      setInputs({
        name:"",
        hp: "",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        image:"",
        types:[]
      })
      return 
    }else{
      setBoolean(true)
    }
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
        <form action=""  onSubmit={handleSubmit}>
          <div>
            <label >*Name: </label>
            <input type="text" name='name' value={input.name} onChange={handleChange}/>
            {boolean && errors.name ? <span style={{"color" : "#FFF"}}>{errors.name}</span> : null}
          </div>

          <div>
            <label >*Hp: </label>
            <input type="number" name='hp' value={input.hp} onChange={handleChange}/>
            {boolean && errors.hp ? <span style={{"color" : "#FFF"}}>{errors.hp}</span>:null}
          </div>

          <div>
            <label >*Attack: </label>
            <input type="number" name='attack' value={input.attack} onChange={handleChange}/>
            {boolean && errors.attack ? <span style={{"color" : "#FFF"}}>{errors.attack}</span>:null}
          </div>

          <div>
            <label >*Defense: </label>
            <input type="number" name='defense' value={input.defense} onChange={handleChange}/>
            {boolean && errors.defense ? <span style={{"color" : "#FFF"}}>{errors.defense}</span>:null}
          </div>

          <div>
            <label >*Speed: </label>
            <input type="number" name='speed' value={input.speed} onChange={handleChange}/>
            {boolean && errors.speed ? <span style={{"color" : "#FFF"}}>{errors.speed}</span>:null}
          </div>

          <div>
            <label >*Height: </label>
            <input type="number" name='height' value={input.height} onChange={handleChange}/>
            {boolean && errors.height ? <span style={{"color" : "#FFF"}}>{errors.height}</span>:null}
          </div>

          <div>
            <label >*Weight: </label>
            <input type="number" name='weight' value={input.weight} onChange={handleChange}/>
            {boolean && errors.weight ? <span style={{"color" : "#FFF"}}>{errors.weight}</span>:null}
          </div>

          <div>
            <label >Image: </label>
            <input type="text" name="image" value={input.image} onChange={handleChange}/>
          </div>

          <div>
            <label >*Select Types</label>
            <select name="" id="" onChange={handleChangeTypes}>
              {
                types.map((type)=>(
                  <option value={type.name} key={type.name}>{type.name}</option>
                ))
              }
            </select>
            <div>
              {input.types.length > 0 && input.types.map(t=>(
                <div key={t}>{t}</div>
              ))}
              {
                boolean && errors.types ? <span style={{"color" : "#FFF"}}>{errors.types}</span>
                :null
              }
            </div>
          </div>

          <button  type='submit'>Submit</button>
          <button >Clean types</button> 
        </form>
      </div>
    </div>
  )
}

// poner que sea true siempre despues cambiarlo a false



// crear una variable en false y los errores se renderizan cuando se vuelve true,
// se vuelve true cuando haces submit, si existen errores no se submitea,
//useEffect

// usar changes para que no tires los errores cuando se postea el pokemon
// usarlo para que el useEffect escuche al changes y no al input asi cuando seteas los estados 
// a su estado inicial no tire los errores