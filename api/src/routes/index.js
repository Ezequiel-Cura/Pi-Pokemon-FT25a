const { Router} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const PokemonsRoutes = require('./Pokemons.js');
const {getAllTypesApi,getAllTypesDb} = require('./util');
const {Type,Pokemon} = require("../db")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', PokemonsRoutes);

router.get("/types",async(req,res)=>{

    try {
      const types = await getAllTypesApi()
      await types.forEach(element => {
        Type.findOrCreate({
          where:{name : element.name}
        })
      });
      const typesDb = await getAllTypesDb()
      return res.status(200).send(typesDb)
    } catch (error) {
      return res.send({error: error.message })
    }
})


module.exports = router;

