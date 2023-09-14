const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
       // Agregamos una propiedad ID que será la Primary Key --A
       id:{
        //Utilizamos UUID para no chocarnos con el ID que viene de la API externa --A
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false
        },
        hp: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        attack: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        defense: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        speed: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        height:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        weight:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        created: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        } 
      },
      {timestamps: false}
  
  );
};
