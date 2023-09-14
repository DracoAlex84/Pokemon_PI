const { DataTypes } = require ('sequelize');
//Esta función exporta el modelo de Genre--A
//Esta función sera la encargada de definir el modelo (sequelize)--A
module.exports = (sequelize) =>{
    sequelize.define("type",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {timestamps: false}
    );
};
