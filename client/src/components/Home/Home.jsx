import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Nav from "../Nav/Nav"
import { getAllPokemons,getTypes ,filterByStatus,filterByType,resetFilters,filterApiDb} from '../../redux/actions'
import Pagination from '../Pagination/Pagination'
import gif from "../../multimedia/pikachu.gif"
import Pokemons from '../Pokemons/Pokemons'
import styles from "./Home.module.css"

export default function Home() {
  const dispatch = useDispatch()
  // let currentPokemons = useSelector(state => state.pokemons)
  const [cargado,setCargado] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const pokePerPage = 12;
  const currentTypes = useSelector(state=> state.types)
  let filteredPoke = useSelector(state=> state.filteredPokemons)
  
  const [filtersValue, setFiltersValue] = useState({
    ABC: "default",
    Api_Db : "All",
    poke_types:"typeDefault"
  })

  useEffect(()=>{
    if(!filteredPoke.length){
      dispatch(getAllPokemons())
    }
    dispatch(getTypes())
  },[dispatch])//eslint-disable-line

  
 
  function handleFilterByStatus(e){
    dispatch(filterByStatus(e.target.value)) 
    // console.log("NAME SELECT",e.target.name)
    // console.log("value SELECT",e.target.value)
    setFiltersValue({
      ...filtersValue,
      [e.target.name] : [e.target.value]
    })
  }
  function handleFilterByType(e){
    // console.log(e.target.value)
    dispatch(filterByType(e.target.value))
    setCargado(true)
    setFiltersValue({
      ...filtersValue,
      [e.target.name] : [e.target.value],
      ABC : "default"
    })
  }

  function handleFilterByApiDb(e){
    dispatch(filterApiDb(e.target.value));
    setFiltersValue({
      ...filtersValue,
      [e.target.name] : [e.target.value],
      ABC: "default",
      poke_types:"typeDefault"
    })
  }
  function handleReset(e){
    dispatch(resetFilters())
    setFiltersValue({
      ABC: "default",
      Api_Db : "All",
      poke_types:"typeDefault"
    })
  }
  function handleAllChanges(e){
    // console.log(e.target.name)
    // console.log(e.target.value)
  }

  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPoke = filteredPoke?.slice(indexOfFirstPoke,indexOfLastPoke)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='home'>
      <Nav />
      <div className={styles.home_cointainer}>
        <div className={styles.filter_father} onChange={e => handleAllChanges(e)}>
          <h4>Filtros</h4>
          <div>
            <select  name="ABC" onChange={e => handleFilterByStatus(e)}  value={filtersValue.ABC} className={styles.select}>
              <option value="default">Order</option>
              <option value="asc">A-Z</option>
              <option value="des">Z-A</option>
              <option value="attack">Attack</option>
            </select>
            <select name="Api_Db" onChange={e =>{ 
              handleFilterByApiDb(e)
              setCurrentPage(1);
              }} value={filtersValue.Api_Db} className={styles.select}>
              <option value="All">All Pokemons</option>
              <option value="Api">Api Pokemons</option>
              <option value="Db">Db Pokemons</option>
            </select>
            <select name="poke_types" onChange={e=>{
              handleFilterByType(e);
              setCurrentPage(1);
              }} value={filtersValue.poke_types} className={styles.select}>
              <option value="typeDefault">Types</option>
              {
                // currentTypes.length > 0 ?
                currentTypes.map((type)=>(
                  <option value={type.name} key={type.name}>{type.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <button onClick={e=>{
              handleReset(e);

            }} type="reset" className={styles.button_4}>Clean filters</button>
          </div>
        </div>
        
        <Pagination pokePerPage={pokePerPage} totalPoke={filteredPoke.length} paginate={paginate}/>
        
        <div className={styles.pokemon_cointainer}>

          {
            currentPoke.length || cargado?
            
              <Pokemons 
                state ={currentPoke}
              />
            :
              <div className={styles.cointainer_pikaGif}>
                <img src={gif} alt="loading" />
                <span>Loading...</span>
              </div>
          }
        </div> 
        <Pagination pokePerPage={pokePerPage} totalPoke={filteredPoke.length} paginate={paginate}/>

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


/* {
    currentPoke.length ? 
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
} */