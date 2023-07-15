const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Usuario = require("../Models/Usuario");
const Perfil = require("../Models/Perfil");
const Foto = require("../Models/Foto");
const Album = require("../Models/Album");
const Recado = require('../Models/Recado');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("dborkutangular", "root", "root", {
    host: "localhost",
    dialect: "mysql",
  });
module.exports = {
    registro: async (usuarioReq) => {
        if (usuarioReq) {
            if (usuarioReq.email !== usuarioReq.emailConfirmacao ||
                usuarioReq.senha != usuarioReq.senhaConfirmacao) {
                throw new Error("Dados cadastrais divergentes.");
            }
            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(usuarioReq.senha, salt);
            usuarioReq.senha = senhaHash;

            let novoUsuario = await Usuario.create(usuarioReq);
            if (novoUsuario) {
                await Perfil.create({
                    usuarioId: novoUsuario.dataValues.id,
                    nomePerfil: novoUsuario.nomeUsuario,
                });
                const token = jwt.sign({ nomeUsuario: novoUsuario.nomeUsuario }, process.env.JWT_SECRET);
                return token;
            }
        }
        throw new Error("Dados cadastrais incompletos.");
    },
    login: async (usuarioReq) => {

        if (usuarioReq.email) {
            if (usuarioReq.senha) {
                let usuario = await Usuario.findOne({ where: { email: usuarioReq.email } });
                if (usuario) {
                    const checagemSenha = await bcrypt.compare(usuarioReq.senha, usuario.senha);
                    if (checagemSenha) {
                        const token = jwt.sign({
                            nomeUsuario: usuario.nomeUsuario
                        }, process.env.JWT_SECRET);
                        return token;
                    }
                }
                throw new Error("Dados de acesso incorretos.")
            }
        }
        throw new Error("Dados de acesso incompletos.");
    },
    atualizar: async (nomeUsuario, formDataUsuario, nomeFoto) => {
        let usuario = await Usuario.findOne({ where: { 'nomeUsuario': nomeUsuario }, include:{model:Perfil} });
        if (usuario.perfi) {
            if (nomeFoto) {
                await Foto.create({
                    nomeFoto: nomeFoto,
                    usuarioId: usuario.id
                });   
                formDataUsuario["fotoPerfil"] = nomeFoto
            }
            await usuario.perfi.update(formDataUsuario);
            return usuario.perfi;
        }
        throw new Error("Problemas ao encontrar o usuário: Usuário inexistente.")
    },
    buscarPerfil: async (nomeUsuario) => {
        if (nomeUsuario) {
            let usuario = await Usuario.findOne({ where: { 'nomeUsuario': nomeUsuario}, attributes: {
                exclude: ['senha', 'createdAt', 'updatedAt', 'id']
              }, include:{model:Perfil} });
            if(!usuario){throw new Error()}
            return usuario;
        }
    },
    buscarPerfilInfo:async(nomeUsuario)=>{
        if (nomeUsuario) {
            let usuario = await Usuario.findOne({where:{'nomeUsuario':nomeUsuario}})
            let perfilInfo=  {
                'quantidadeFotos' : 1,
                'quantidadeRecados': (await Recado.findAll({ where: { 'destinatario': nomeUsuario}})).length,
            }
            return perfilInfo;
        }
        throw new Error();
    }
}