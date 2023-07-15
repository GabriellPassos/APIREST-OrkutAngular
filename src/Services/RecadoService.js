const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Usuario = require("../Models/Usuario");
const Recado = require("../Models/Recado");
const Foto = require("../Models/Foto");
const Perfil = require("../Models/Perfil");
module.exports = {
    novo: async (nomeDestinatario, nomeRemetente, mensagem, fotos) => {
        let destinatario = await Usuario.findOne({ where: { 'nomeUsuario': nomeDestinatario } });
        let remetente = await Usuario.findOne({ where: { 'nomeUsuario': nomeRemetente } });
        if (remetente && destinatario) {
            let recado = await Recado.create({
                destinatario: destinatario.nomeUsuario,
                usuarioId: remetente.id,
                mensagem, mensagem
            });
            if (recado) {
                for (let index = 0; index < fotos.length; index++) {
                    await Foto.create({
                        nomeFoto: fotos[index],
                        recadoId: recado.id,
                        usuarioId: remetente.id
                    });
                }
                return;
            }
        }
        throw new Error("Erro ao inserir novo recado.");
    },
    buscar: async (nomeUsuario) => {
        let recados = await Recado.findAll({ where: { 'destinatario': nomeUsuario }}, { order: [['recados', 'updatedAt', 'DESC']] });
        for (let index = 0; index < recados.length; index++) {
            const recado = recados[index];
            let usuario = await Usuario.findByPk(recado.usuarioId, {include:{model:Perfil}})
            recados[index] = {
                nomePerfil: usuario.perfi.nomePerfil,
                nomeUsuario: usuario.nomeUsuario,
                fotoPerfil: usuario.perfi.fotoPerfil,
                destino: recado.destinatario,
                mensagem: recado.mensagem,
                createdAt:recado.createdAt,

            }
        }
        if (recados) {
            console.log(recados)
            return {
                recados

            }
        }
        throw new Error("Erro ao buscar recados.");
    },
    excluir: async (nomeUsuario, recadoId) => {
        let recado = await Recado.findByPk(recadoId, { include: ['usuario'] });
        console.log(recado.usuario.nomeUsuario, nomeUsuario)
        if (recado.usuario.nomeUsuario == nomeUsuario) {
            await recado.destroy();
            return;
        }
        throw new Error("Erro ao excluir recado.");
    }
}