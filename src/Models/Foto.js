const Sequelize = require("sequelize");
const Database = require("./Database");
const Album = require("./Album");
const Foto = Database.define("fotos", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFoto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: true,
    }
},{
    defaultScope:{
        attributes:{
            exclude:['createdAt', 'updatedAt', ]
        }
    }
});

module.exports = Foto;