const axios = require("axios");
const { Router } = require("express");
// const Pokemon = require("../models/Pokemon");
const {Pokemon,Type} = require('../db')

const {getPokeApi,getPokeDb,getAllPoke} = require('./util')

const router = Router()

router.post("/",async(req,res)=>{
  console.log(req.body)
  try {
    await Pokemon.create(req.body)
    return res.send({msg: "Pokemon creado"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/",async(req,res)=>{
  const {name} = req.query;
  const allPokemons = await getAllPoke()

  if(name){
    let pokeName = await allPokemons.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
    pokeName ? 
    res.status(200).send(pokeName) : 
    res.status(404).send("No se encontro ese Pokemon")
  }
  else{
    res.status(200).send(allPokemons)
  }
})


router.get("/:id",async(req,res)=>{
  const {id} = req.params;
  try {
    const pokemons = await getAllPoke()
    // console.log("ALL POKE",pokemons)
    const thePoke = await pokemons.find(p=> p.id == id);
    // console.log("THE POKE",thePoke);
    if(thePoke){
      return res.status(200).send(thePoke)
    }else{
      return res.status(404).send("Pokemon not found")
    }
  } catch (error) {
    res.send(error)
  }
})




module.exports = router