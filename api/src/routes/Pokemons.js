const axios = require("axios");
const { Router } = require("express");
const {Pokemon,Type} = require('../db')

const {getPokeApi,getPokeDb,getAllPoke,getPokemon,getPokeByName} = require('./util')

const router = Router()
// /pokemons

router.post("/",async(req,res)=>{
  const {types} = req.body
  console.log(req.body)
  try {
    if(req.body.image === ""){
      req.body.image = "https://w0.peakpx.com/wallpaper/90/124/HD-wallpaper-error-404-error-glitch-modern-new-sharp.jpg"
      console.log(req.body)

    }
    const newPoke = await Pokemon.create(req.body)
    const typesDb = await Type.findAll({
      where:{name:types}
    })
    newPoke.addTypes(typesDb)
    return res.send({msg: "Pokemon creado"});
  } catch (error) {
    console.log(error)
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
      console.log("PASO POR LA RUTA")
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
    
    if(thePoke){
      return res.status(200).send(thePoke)
    }else{
      return res.status(404).send("Pokemon not found")
    }
  } catch (error) {
    console.log("ERROR DESDE LA RUTAS",error.message)
    res.status(404).send(error.message)
  }
})


router.delete("/delete/:id",async(req,res)=>{
  const {id} = req.params

  try {
    await Pokemon.destroy({
      where : { id : id}
    })
    res.status(200).send("Pokemon deleted successfully")
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = router