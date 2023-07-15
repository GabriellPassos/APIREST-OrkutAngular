const Sequelize = require("sequelize");
const Database = require("./Database");
const Usuario = require("./Usuario");
const Foto = require("./Foto");
const Recado = Database.define("recados", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    destinatario:{
        type:Sequelize.STRING,
        allowNull: true,
    }
},
);
Recado.belongsTo(Usuario,{
    foreignKey:{
    allowNull:false
}
});
Recado.hasMany(Foto, {
    foreignKey:{
        allowNull:true,
    },
    as:'fotos',
});
Foto.belongsTo(Recado, {
    foreignKey:{
        allowNull:true,
    },
});
module.exports = Recado;