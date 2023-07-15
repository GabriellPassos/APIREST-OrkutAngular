const Sequelize = require("sequelize");
const Database = require("./Database");
const Foto = require("./Foto");
const Usuario = require("./Usuario");
const Album = Database.define("albums", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}
,{
    defaultScope:{
        attributes:{
            exclude:['updatedAt', 'createdAt', ]
        }
    }
});
Album.hasMany(Foto,{    onDelete:"CASCADE"});
Foto.belongsTo(Album,{
    foreignKey:{
        allowNull:true,
    },

});
module.exports = Album;