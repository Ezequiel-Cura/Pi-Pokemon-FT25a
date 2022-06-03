import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemon } from '../../redux/actions'
import styles from "./DetailPokemon.module.css" 
import {Link} from "react-router-dom"
import PikaGif from "../../multimedia/pikachu.gif"

export default function DetailPokemon(props) {
  const {id} = useParams()
  const dispatch = useDispatch()
  const thePokemon = useSelector(state => state.poke)

  console.log(thePokemon)
  //  console.log(thePokemon.type.length)

  useEffect(()=>{
    dispatch(getPokemon(id))
  },[dispatch,id])
  
  return (
    <div className={styles.pokemonDetail}>
      <div>
        <Link to="/home"><button>Volver</button></Link>
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
        </div>    
          ):(
            <div>
              <img src={PikaGif} alt="" />
            </div>
          )
        }
      </div>
    </div>
  )
}
//.length === 1  ? thePokemon.type : thePokemon.type.join(" , ")