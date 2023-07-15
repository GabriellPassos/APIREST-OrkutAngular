const Sequelize = require("sequelize");
const Database = require("./Database");
const Foto = require("./Foto");
const Perfil = Database.define("perfis", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fotoPerfil: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    nomePerfil:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    frasePerfil:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    quemSouEu: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    relacionamento: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    livros: {
        type: Sequelize.STRING,
        allowNull: true
    },
    musicas: {
        type: Sequelize.STRING,
        allowNull: true
    },
    filmes: {
        type: Sequelize.STRING,
        allowNull: true
    },
});


module.exports = Perfil;