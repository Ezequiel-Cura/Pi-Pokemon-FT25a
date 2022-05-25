import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'


export default function DetailPokemon() {
  const dispatch = useDispatch()
  const thePokemon = useSelector(state => state.pokemon)

  useEffect(()=>{
    dispatch()
  })
  return (
    <div>
      {
        

      }
    </div>
  )
}
