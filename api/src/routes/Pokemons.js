const axios = require("axios");
const { Router } = require("express");
const {Pokemon,Type} = require('../db')

const {getPokeApi,getPokeDb,getAllPoke,getPokemon,getPokeByName} = require('./util')

const router = Router()
// /pokemons

router.post("/",async(req,res)=>{
  const {type} = req.body
  console.log(req.body)
  try {
    const newPoke = await Pokemon.create(req.body)
    const typesDb = await Type.findAll({
      where:{name:type}
    })
    newPoke.addTypes(typesDb)
    return res.send({msg: "Pokemon creado"});
  } catch (error) {
    res.status(400).send({error:error.message})
  }
})

// /pokemons
router.get("/",async(req,res)=>{
  const {name} = req.query;
  try {
    const allPokemons = await getAllPoke()
    if(name){
      let pokeName = await getPokeByName(name)
      if(pokeName) return res.status(200).send(pokeName) 
      return res.status(404).send("No se encontro ese Pokemon")
    }
    else{
      // console.log(allPokemons)
      return res.status(200).send(allPokemons)
    }
    
  } catch (error) {
    console.log(error.message)
    res.status(404).send({error: error.message})
  }
})


router.get("/:id",async(req,res)=>{
  const {id} = req.params;
  
  try {
    const thePoke = await getPokemon(id)
    // const pokemons = await getAllPoke()
    // // console.log("ALL POKE",pokemons)
    // const thePoke = await pokemons.find(p=> p.id == id);
    // console.log("THE POKE",thePoke);
    if(thePoke){
      return res.status(200).send(thePoke)
    }else{
      return res.status(404).send("Pokemon not found")
    }
  } catch (error) {
    res.send(error.message)
  }
})




module.exports = router