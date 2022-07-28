import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPokemon,getAllPokemons,getTypes } from '../../redux/actions' 
import {Link} from "react-router-dom"
import Validate from './Validator'
import styles from "./CreatePokemon.module.css"


export default function CreatePokemon() {
  const dispatch = useDispatch()

  // const [changes,setChanges] = useState(0)
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
  },[input])//eslint-disable-line


  function handleChange({target}){
    setInputs({
      ...input,
      [target.name]: target.value
    })
    // setChanges(changes + 1)
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
    // setChanges(changes + 1)
    // setErrors(Validate(input))
  }
  function handleReset(){
    setInputs({
      ...input,
      types:[]
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    // setErrors(Validate({
    //   ...input,
    //   [e.target.name] : e.target.value
    // },allPokemons))

    // console.log("ERRORES",Object.keys(errors).length,errors)
    if(Object.keys(errors).length === 0){
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
      alert("Pokemon Created Successfully")
      setBoolean(false)
      return 
    }else{
      setBoolean(true)
    }
  }
  return (
    <div className={styles.cointanier}>
      <div className={styles.false_nav}>
        <div>
          <Link to="/home"><button className={styles.button_32}>Return Home</button></Link>
        </div>
        <div className={styles.titulo}>
          
            <h1>Create your Pokemon</h1>
          
        </div>
      </div>

      <div className={styles.form} >
        <form action=""  onSubmit={handleSubmit} className={styles.inside_form}>
          <div className={styles.eachInput}>
            <label >*Name: </label>
            <input type="text" name='name' value={input.name} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.name ? <span className={styles.msgErrors}>{errors.name}</span> : null}
          </div>

          <div className={styles.eachInput}>
            <label >*Hp: </label>
            <input type="number" name='hp' value={input.hp} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.hp ? <span className={styles.msgErrors}>{errors.hp}</span>:null}
          </div>

          <div className={styles.eachInput}>
            <label >*Attack: </label>
            <input type="number" name='attack' value={input.attack} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.attack ? <span className={styles.msgErrors}>{errors.attack}</span>:null}
          </div>

          <div className={styles.eachInput}>
            <label >*Defense: </label>
            <input type="number" name='defense' value={input.defense} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.defense ? <span className={styles.msgErrors}>{errors.defense}</span>:null}
          </div>

          <div className={styles.eachInput}>
            <label >*Speed: </label>
            <input type="number" name='speed' value={input.speed} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.speed ? <span className={styles.msgErrors}>{errors.speed}</span>:null}
          </div>

          <div className={styles.eachInput}>
            <label >*Height: </label>
            <input type="number" name='height' value={input.height} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.height ? <span className={styles.msgErrors}>{errors.height}</span>:null}
          </div>

          <div className={styles.eachInput}>
            <label >*Weight: </label>
            <input type="number" name='weight' value={input.weight} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.weight ? <span className={styles.msgErrors}>{errors.weight}</span>:null}
          </div>

          <div className={styles.eachInput}>
            <label >Image: </label>
            {/* usar base 64 y input text area */}
            <input type="text" name="image" value={input.image} onChange={handleChange} autoComplete="off"/>
            {boolean && errors.image ? <span className={styles.msgErrors}>{errors.image}</span>:null}

          </div>

          <div className={styles.eachInput}>
            <label >*Select Types</label>
            <select name="" id="" onChange={handleChangeTypes}>
              <option >-</option>
              {
                types.map((type)=>(
                  <option value={type.name} key={type.name}>{type.name}</option>
                ))
              }
            </select>
            <div className={styles.eachInputType}>
              {input.types.length > 0 && input.types.map(t=>(
                <div key={t} >{t}</div>
              ))}
              {
                boolean && errors.types ? <span className={styles.msgErrors}>{errors.types}</span>
                :null
              }
            </div>
          </div>
          <div>
            
          </div>
          <div className={styles.buttons}>
            <button type='reset' onClick={handleReset} className={styles.button_4}>Clean types</button> 
            <button  type='submit' className={styles.button_4} >Submit</button>
          </div>
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