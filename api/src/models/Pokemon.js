const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida:{
      type: DataTypes.INTEGER,
    },
    Fuerza : {
      type: DataTypes.INTEGER,
    },
    Defensa: {
      type: DataTypes.INTEGER,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
    },
    Altura:{
      type: DataTypes.INTEGER,
    },
    Pesa:{
      type: DataTypes.INTEGER,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  });
};
