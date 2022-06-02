import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Nav from "../Nav/Nav"
import { getAllPokemons,getTypes ,filterByStatus,filterByType,resetFilters,filterApiDb} from '../../redux/actions'
import Pagination from '../Pagination/Pagination'
import gif from "../../multimedia/pikachu.gif"
import Pokemons from '../Pokemons/Pokemons'


export default function Home() {
  const dispatch = useDispatch()
  // let currentPokemons = useSelector(state => state.pokemons)
  const [cargado,setCargado] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const pokePerPage = 12;
  const currentTypes = useSelector(state=> state.types)
  let filteredPoke = useSelector(state=> state.filteredPokemons)
  // console.log(filteredPoke)
  // if(filteredPoke.length > 0){
  //   setCargado(true)
  // }
  // filteredPoke.length ? setCargado(true) : setCargado(false)
  // console.log("TYPES",currentTypes)

  useEffect(()=>{
    dispatch(getAllPokemons())
    dispatch(getTypes())
  },[dispatch])

  

  function handleFilterByStatus(e){
    dispatch(filterByStatus(e.target.value)) 
    // console.log("NAME SELECT",e.target.name)
    // console.log("value SELECT",e.target.value)

  }
  function handleFilterByType(e){
    // console.log(e.target.value)
    dispatch(filterByType(e.target.value))
    setCargado(true)
  }

  function handleFilterByApiDb(e){
    dispatch(filterApiDb(e.target.value))
  }
  function handleReset(e){
    dispatch(resetFilters())
  }
  function handleAllChanges(e){
    // console.log(e.target.name)
    // console.log(e.target.value)
  }

  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPoke = filteredPoke?.slice(indexOfFirstPoke,indexOfLastPoke)

  // console.log(currentPoke)
  // console.log(currentPoke[0].type.length)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  // console.log("EL LENGTH",currentPoke.length)
  return (
    <div className='home'>
      <Nav />
      <div className='home_cointainer'>
        <div className='filter_father' onChange={e => handleAllChanges(e)}>
          <h4>Filtros</h4>
          <select  name="ABC" onChange={e => handleFilterByStatus(e)}>
            <option value="default">Default</option>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </select>
          <select name="Api_Db" onChange={e => handleFilterByApiDb(e)}>
            <option value="All">All Pokemon</option>
            <option value="Api">Api Pokemon</option>
            <option value="Db">Db Pokemon</option>
          </select>
          <select name="poke_types" onChange={e=>{
            handleFilterByType(e);
            setCurrentPage(1);
            }}>
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
        
        <div className='pokemon_cointainer'>
        

            {
              currentPoke.length || cargado?
              
                <Pokemons 
                  state ={currentPoke}
                />
              :
                <div>
                  <img src={gif} alt="loading" />
                  <span>Loading...</span>
                </div>
            }





              {/* {
                  currentPoke.length
                  ? 
                  currentPoke?.map((poke)=>(
                    <PokemonCard 
                      key={poke.id}
                      id={poke.id}
                      name={poke.name}
                      attack={poke.attack}
                      image={poke.image}
                      types={poke.types}
                    />
                  )): 
                  setTimeout(() => {
                    return <h1>No se encontro el pokemon</h1>
                  }, 2000) ?
                    <div>
                      <img src={gif} alt="loading" />
                      <span>Loading...</span>
                    </div> :null
              } */}
        </div>
      </div>
    </div>
  )
}


// SE ROMPE CUANDO NO ENCUENTRA UN POKEMON POR NAME
// Como mostrar los errores que se crean en el back
// 


/*
Idea para hacer un cambio a modo oscuro:
 hacer dos archivos css hacer un bttn que al apretar algo se cambie a true y en el class name hacemos un ternario en que cambia 
 segun si eso esta true o false

*/