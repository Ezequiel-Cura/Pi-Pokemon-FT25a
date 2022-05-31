import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemon } from '../../redux/actions'
import "./DetailPokemon.css"
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
    <div className='pokemonDetail'>
      <div>
        <Link to="/home"><button>Volver</button></Link>
      </div>
      
        {
          thePokemon.types ? (

        <div className='detail_info'>
          <div>
            #{thePokemon.id}
          </div>
          <div>
            <img src={thePokemon.image} alt="Pokemon" />
          </div>
          <div>
            <span>{thePokemon.name}</span>
          </div>
          <div>
            {thePokemon.types.length === 1  ? thePokemon.types : thePokemon.types.join(" , ")}
          </div>

          <div className='dimensiones'>
            <span>Height: {thePokemon.height}</span>
            <span>Weight: {thePokemon.weight}</span>
          </div>
          <div className='stats'>
            <span>Hp: {thePokemon.hp}</span>
            <span>Speed: {thePokemon.speed}</span>
            <span>Attack: {thePokemon.attack}</span>
            <span>Defense: {thePokemon.defense}</span>
          </div>
        </div>    
          ):(
            <div>
              <img src={PikaGif} alt="" />
            </div>
          )
        }
      
    </div>
  )
}
//.length === 1  ? thePokemon.type : thePokemon.type.join(" , ")