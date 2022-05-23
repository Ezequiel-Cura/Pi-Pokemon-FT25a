const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Tipo',{
    Nombre:{
      type: DataTypes.STRING
    }
  })
}
