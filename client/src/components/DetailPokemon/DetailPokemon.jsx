import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPokemon } from '../../redux/actions'
import "./DetailPokemon.css"
import {Link} from "react-router-dom"

export default function DetailPokemon(props) {
  const {id} = useParams()
  const dispatch = useDispatch()
  const thePokemon = useSelector(state => state.poke)

  // console.log(thePokemon)
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
        thePokemon.type ? (

      <div>
        <div>
          {thePokemon.id}
        </div>
        <div>
          <img src={thePokemon.image} alt="Pokemon" />
        </div>
        <div>
          <span>{thePokemon.name}</span>
        </div>
        <div>
          {thePokemon.type.length === 1  ? thePokemon.type : thePokemon.type.join(" , ")}
        </div>

        <div className='dimensiones'>
          <span>{thePokemon.height}cm</span>
          <span>{thePokemon.weight}kg</span>
        </div>
        <div className='stats'>
          <span>{thePokemon.speed}</span>
          <span>{thePokemon.attack}</span>
          <span>{thePokemon.defense}</span>
          <span>{thePokemon.hp}</span>
        </div>
      </div>    
        ):(
          <div>
            <img src="../../multimedia/pikachu.gif" alt="" />
          </div>
        )
      }
    </div>
  )
}
//.length === 1  ? thePokemon.type : thePokemon.type.join(" , ")