const Sequelize = require("sequelize");
const Database = require("./Database");
const Album = require("./Album");
const Perfil = require("./Perfil");
const Foto = require("./Foto");
const Usuario = Database.define("usuarios", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeUsuario: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    aniversario: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
});
Usuario.hasMany(Album);
Album.belongsTo(Usuario, {
    foreignKey: {
        allowNull: false
    },
});
Usuario.hasOne(Perfil);
Perfil.belongsTo(Usuario);

Usuario.hasOne(Foto);
Foto.belongsTo(Usuario,{
    foreignKey:{
        allowNull:true
    },
});
module.exports = Usuario;