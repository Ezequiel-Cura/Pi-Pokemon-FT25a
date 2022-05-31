const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      
    },
    image:{
      type: DataTypes.STRING,
      defaultValue:"https://w0.peakpx.com/wallpaper/90/124/HD-wallpaper-error-404-error-glitch-modern-new-sharp.jpg"
    },
    hp:{
      type: DataTypes.INTEGER,
      
    },
    attack : {
      type: DataTypes.INTEGER,
      
    },
    defense: {
      type: DataTypes.INTEGER,
      
    },
    speed: {
      type: DataTypes.INTEGER,
      
    },
    height:{
      type: DataTypes.INTEGER,
      
    },
    weight:{
      type: DataTypes.INTEGER,
      
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
    }
  });
};
