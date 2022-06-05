import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemon,deletePokemon,resetDetail } from '../../redux/actions'
import styles from "./DetailPokemon.module.css" 
import {Link} from "react-router-dom"
import PikaGif from "../../multimedia/pikachu.gif"

export default function DetailPokemon() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const thePokemon = useSelector(state => state.poke)
  const [eliminate,setEliminate] = useState(false)

  // console.log(thePokemon)
  //  console.log(thePokemon.type.length)
  function handleEliminate(){
    setEliminate(!eliminate)
    dispatch(deletePokemon(id))
  }
  function handleClick(){
    setEliminate(!eliminate)
  }
  function handleGoingBack(){
    dispatch(resetDetail())
    
  }
  useEffect(()=>{
    dispatch(getPokemon(id))
  },[dispatch,id])
  
  return (
    <div className={styles.pokemonDetail}>
      <div>
        <Link to="/home"><button onClick={handleGoingBack}>Volver</button></Link>
      </div>
      <div className={styles.false_background}></div>
      <div className={styles.pokeDetail}>
        {
          thePokemon.types ? (

        <div className={styles.detail_info}>
          <div className={styles.eachInfo}>
            #{thePokemon.id}
          </div>
          <div>
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
          <div className={styles.eliminate_button}>
            <button onClick={handleClick}>Eliminate Pokemon</button>
          </div>
        </div>    
          ):(
            <div>
              <img src={PikaGif} alt="" />
            </div>
          )
        }
        {
          eliminate ? (
            <div className={styles.eliminate_card}>
              <span>Are you sure you want to eliminate this pokemon?</span>
              <div>
                <button onClick={handleEliminate}>Yes</button>
                <button onClick={handleClick}>No</button>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}
//.length === 1  ? thePokemon.type : thePokemon.type.join(" , ")