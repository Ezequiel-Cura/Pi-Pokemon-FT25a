const axios = require("axios");
const { Router } = require("express");
const {Pokemon,Type} = require('../db')

const {getPokeApi,getPokeDb,getAllPoke,getPokemon,getPokeByName} = require('./util')

const router = Router()
// /pokemons

router.post("/",async(req,res)=>{
  const {types} = req.body

  try {
    
    if(req.body.image === ""){
      req.body.image = "https://w0.peakpx.com/wallpaper/90/124/HD-wallpaper-error-404-error-glitch-modern-new-sharp.jpg"
    }
    // const imagen = await axios.get("https://www.pinclipart.com/picdir/big/527-527284_pokemon-png-transparent-images-pokemon-png-clipart.png")
    // console.log("CONSOLE.LOG DEL IMAGEN",imagen.data)

    const newPoke = await Pokemon.create(req.body)
    const typesDb = await Type.findAll({
      where:{name:types}
    })
    newPoke.addTypes(typesDb)
    return res.send({msg: "Pokemon creado"});
  } catch (error) {
    res.status(400).send({error:error.message})
  }
})

// /pokemons
router.get("/",async(req,res)=>{
  const {name,status} = req.query;
  
  try {
    if(status === "Api"){
      const apiPk = await getPokeApi()
      return res.status(200).send(apiPk)
    }else if(status === "Db"){
      const dbPk = await getPokeDb()
      return res.status(200).send(dbPk)
    }
    if(name){
      let pokeName = await getPokeByName(name)
      if(pokeName) return res.status(200).send(pokeName) 
      return res.status(404).send("No se encontro ese Pokemon")
    }
    else{
      const allPokemons = await getAllPoke()
      return res.status(200).send(allPokemons)
    }
    
  } catch (error) {
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

router.put("/put/:id",async(req,res)=>{
  const {id} = req.params
  const {name,hp,attack,defense,speed,height,weight,types} = req.body
  
  try {
    await Pokemon.upsert({
      id: id,
      name : name,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height:height,
      weight: weight,
    })
    let pokemon2 = await Pokemon.findOne({
      where:{id:id},
      include:{
        model : Type,
        attributes : ['name'],
        through:{
          attributes:[]
        }
      }
    })
    const typesDb = await Type.findAll({
      where:{name:types}
    })
    await pokemon2.setTypes(typesDb)
    
    res.status(200).send("Pokemon updated")
  } catch (error) {
    
    res.status(404).send("Update failed")
  }
})


module.exports = router