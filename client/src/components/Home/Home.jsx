import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Nav from "../Nav/Nav"
import { getAllPokemons,getTypes ,filterByStatus,filterByType,resetFilters} from '../../redux/actions'
import PokemonCard from "../PokemonCard/PokemonCard"
import Pagination from '../Pagination/Pagination'
import gif from "../../multimedia/pikachu.gif"


export default function Home() {
  const dispatch = useDispatch()
  // let currentPokemons = useSelector(state => state.pokemons)
  const [currentPage,setCurrentPage] = useState(1)
  const [pokePerPage,setPokePerPage] = useState(12)

  const currentTypes = useSelector(state=> state.types)
  let filteredPoke = useSelector(state=> state.filteredPokemons)

  // if(filteredPoke.length > 0){
  //   currentPokemons = filteredPoke
  // }
  // console.log("TYPES",currentTypes)
  useEffect(()=>{
    dispatch(getAllPokemons())
    dispatch(getTypes())
  },[dispatch])

  function handleFilterByStatus(e){
    dispatch(filterByStatus(e.target.value)) 
  }
  function handleFilterByType(e){
    // console.log(e.target.value)
    dispatch(filterByType(e.target.value))
  }

  function handleFilterByApiDb(){

  }
  function handleReset(e){
    dispatch(resetFilters())
  }

  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPoke = filteredPoke.slice(indexOfFirstPoke,indexOfLastPoke)

  // console.log(currentPoke)
  // console.log(currentPoke[0].type.length)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className='home'>
      <Nav />

      <div>
        <h4>Filtros</h4>
        <select name="ABC" id="" onChange={e => handleFilterByStatus(e)}>
          <option value="default">Default</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
        <select name="" id="" onChange={e => handleFilterByApiDb(e)}>
          <option value="All">All Pokemon</option>
          <option value="Api">Api Pokemon</option>
          <option value="Db">Db Pokemon</option>
        </select>
        <select name="" id="" onChange={e=>handleFilterByType(e)}>
          <option value="typeDefault">Default</option>
          {
            // currentTypes.length > 0 ?
            currentTypes.map((type)=>(
              <option value={type.name} key={type.name}>{type.name}</option>
            ))
          }
        </select>
        <div>
          <button onClick={e=>handleReset(e)}>Clean filters</button>
        </div>
      </div>
      
      <Pagination pokePerPage={pokePerPage} totalPoke={filteredPoke.length} paginate={paginate}/>
      
      <div>
       
            {
              currentPoke.length > 0 ? 
              currentPoke.map((poke)=>(
                <PokemonCard 
                  key={poke.id}
                  id={poke.id}
                  name={poke.name}
                  attack={poke.attack}
                  image={poke.image}
                  type={poke.type}
                />
              )):
                (
                  <div>
                    <img src={gif} alt="loading" />
                    <span>Loading</span>
                  </div>
                )
          
            }
            

        
      </div>
    </div>
  )
}


// SE ROMPE CUANDO NO ENCUENTRA UN POKEMON POR NAME
// 
// 