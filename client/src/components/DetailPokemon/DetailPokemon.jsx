import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemon,deletePokemon,resetDetail,updatePokemon, getAllPokemons,getTypes } from '../../redux/actions'
import styles from "./DetailPokemon.module.css" 
import {Link} from "react-router-dom"
import PikaGif from "../../multimedia/pikachu.gif"
import Validate from '../CreatePokemon/Validator'

export default function DetailPokemon() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const types = useSelector(state=>state.types)
  const thePokemon = useSelector(state => state.poke)
  let allPokemons = useSelector(state=>state.pokemons)
  allPokemons = allPokemons.filter(p=> p.id !== id)
  console.log(allPokemons)
  const [eliminate,setEliminate] = useState(false)
  const [update,setUpdate]=useState(false)
  const [errors,setErrors] = useState({})
  const [data,setData] = useState({
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
  console.log(data)
  function handleEliminate(){
    setEliminate(!eliminate)
    dispatch(deletePokemon(id))
  }
  function handleClick(){
    setUpdate(false)
    setEliminate(!eliminate)// pop up of eleminate
  }
  function handleGoingBack(){
    dispatch(resetDetail())
  }
  useEffect(()=>{
    dispatch(getPokemon(id))
    dispatch(getAllPokemons())
    dispatch(getTypes())
  },[dispatch,id])
  useEffect(()=>{
    setData({
      name:thePokemon.name,
      hp : thePokemon.hp,
      attack: thePokemon.attack,
      defense:thePokemon.defense,
      speed:thePokemon.speed,
      height:thePokemon.height,
      weight:thePokemon.weight,
      image:thePokemon.image,
      types:thePokemon.types
    })
  },[thePokemon])

  useEffect(()=>{
    if(data.name){
      setErrors(Validate(data,allPokemons))
    }
  },[data])

  function handleUpdate(){
    dispatch(updatePokemon(id,data))// dispatch to the back
    window.location.reload()
  }
  function handleClickUpdate(){
    setEliminate(false)
    setUpdate(!update)// pop up of update
  }
  function handleChangesUpdate(e){
    e.preventDefault()
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }


  function handleChangeTypes(e){
    if(data.types.length <=1){
      setData({
        ...data,
        types: [...data.types,e.target.value]
      })
    }
    // setChanges(changes + 1)
    // setErrors(Validate(input))
  }

  function handleReset(){
    setData({
      ...data,
      types:[]
    })
  }
  return (
    <div className={styles.pokemonDetail}>
      <div>
        <Link to="/home"><button onClick={handleGoingBack} className={styles.button_32}>Return Home</button></Link>
      </div>
      <div className={styles.false_background}></div>
      <div className={styles.pokeDetail}>
        {
          thePokemon.types ? (

        <div className={styles.detail_info}>
          <div className={styles.eachInfo}>
            #{thePokemon.id}
          </div>
          <div className={styles.pokemon_image}>
            <img src={thePokemon.image} alt="Pokemon" />
          </div>
          <div  className={styles.eachInfo}>
            <span>{thePokemon.name.toUpperCase()}</span>
          </div>
          <div  className={styles.eachInfo}>
            <div>
              <span>Types: </span>
            </div>
            <span>
              {thePokemon.types.length === 1  ? thePokemon.types : thePokemon.types.join(" , ").toUpperCase()}
            </span>
          </div>
          <div className={styles.info_cointainer}>
            <div className={styles.dimensiones}>
              <span>Height: {thePokemon.height}</span>
              <span>Weight: {thePokemon.weight}</span>
            </div>
            <div className={styles.stats}>
              <div>
                <span>Hp: {thePokemon.hp}</span>
                <span>Speed: {thePokemon.speed}</span>
              </div>
              <div>
                <span>Attack: {thePokemon.attack}</span>
                <span>Defense: {thePokemon.defense}</span>
              </div>
            </div>
          </div>
          {
            typeof thePokemon.id === "string" ? (
              <div className={styles.eliminate_button}>
                <button onClick={handleClick} className={styles.button_24}>
                  Delete pokemon
                </button>
                <button onClick={handleClickUpdate} className={styles.button_update}>
                  Update pokemon
                </button>
              </div>
              ) : null
          }
        </div>    
          ):(
            <div>
              <img src={PikaGif} alt="" />
            </div>
          )
        }
        {
          eliminate ? (
            <>
              <div className={styles.closing_div} onClick={()=>setEliminate(false)}></div>
              <div className={styles.eliminate_card}>
                <span>Are you sure you want to eliminate this pokemon?</span>
                <div>
                  <button onClick={handleEliminate}>Yes</button>
                  <button onClick={handleClick}>No</button>
                </div>
              </div>
            </>
          ) : null
        }
        {
          update ? (
            <>
            <div className={styles.closing_div} onClick={()=>setUpdate(false)}>
            </div>
              <div className={styles.formUpdate}>
                <span>Update your pokemon</span>
                <form action=""  >
                  <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" value={data.name} name="name" onChange={(e)=>handleChangesUpdate(e)}/>
                    {errors.name ? <span className={styles.msgErrors}>{errors.name}</span> : null}
                  </div>

                  <div>
                    <label htmlFor="">Hp: </label>
                    <input type="number" value={data.hp} name="hp" onChange={(e)=>handleChangesUpdate(e)}/>

                  </div>

                  <div>
                    <label htmlFor="">Attack:</label>
                    <input type="number" value={data.attack} name="attack" onChange={(e)=>handleChangesUpdate(e)}/>

                  </div>

                  <div>
                    <label htmlFor="">Defense:</label>
                    <input type="number" value={data.defense} name="defense" onChange={(e)=>handleChangesUpdate(e)}/>

                  </div>
                  <div>
                    <label htmlFor="">Speed:</label>
                    <input type="number" value={data.speed} name="speed" onChange={(e)=>handleChangesUpdate(e)}/>

                  </div>
                  <div>
                    <label htmlFor="">Height:</label>
                    <input type="number" value={data.height} name="height" onChange={(e)=>handleChangesUpdate(e)}/>

                  </div>
                  <div>
                    <label htmlFor="">Weight:</label>
                    <input type="number" value={data.weight} name="weight" onChange={(e)=>handleChangesUpdate(e)}/>

                  </div>
                  <div>
                    <label htmlFor="">Change Types</label>
                    <select name="" id="" onChange={handleChangeTypes}>
                      <option >-</option>
                      {
                        types.map((type)=>(
                          <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                      }
                    </select>
                    <div className={styles.eachInputType}>
                      {data.types.length > 0 && data.types.map(t=>(
                        <div key={t} >{t}</div>
                      ))}
                      {
                        errors.types ? <span className={styles.msgErrors}>{errors.types}</span>
                        :null
                      }
                    </div>
                    <button type='reset' onClick={handleReset}>Clean Types</button>
                  </div>
                  {/* <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                  </div> */}
                </form>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleClickUpdate}>Cancel</button>
              </div>
            </>
          )
          :
          null
        }
      </div>
    </div>
  )
}
//.length === 1  ? thePokemon.type : thePokemon.type.join(" , ")