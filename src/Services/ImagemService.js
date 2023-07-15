const Album = require("../Models/Album");
const Foto = require("../Models/Foto");
const Usuario = require("../Models/Usuario");
const Perfil = require("../Models/Perfil");
const path = require('path');
const caminhoArmazenamento = 'src/Data/Uploads';
module.exports = {
    novoAlbum: async (formInfo, fotos, nomeUsuario) => {
        let usuario = await Usuario.findOne({ where: { 'nomeUsuario': nomeUsuario }, include:{model:Perfil}});
        if (usuario && formInfo.titulo.length > 0) {
            let album = await Album.create({
                titulo: formInfo.titulo,
                usuarioId: usuario.id,
            });
            if (album) {
                for (let index = 0; index < fotos.length; index++) {
                    await Foto.create({
                        nomeFoto: fotos[index],
                        titulo: formInfo[index],
                        albumId: album.id,
                        usuarioId: usuario.id
                    });
                }
            }
            return album;
        }
    },
    buscarAlbum: async (nomeUsuario) => {
        let usuario = await Usuario.findOne({ where: { 'nomeUsuario': nomeUsuario } });
        if (usuario) {
            let albums = await Album.findAll({ where: { 'usuarioId': usuario.id }, include: ['fotos'] });
            return albums;
        }
        throw new Error("Nenhum álbum encontrado.");
    },
    buscarAlbumPorId: async (albumId, nomeUsuario) => {
        if (albumId && nomeUsuario) {
            let usuario = await Usuario.findOne({where:{'nomeUsuario':nomeUsuario},include:{model:Album, include:['fotos'], where:{'id':albumId}}})
            if(usuario.nomeUsuario == nomeUsuario){return usuario.albums[0];}
        }
        throw new Error("Nenhum álbum encontrado.");
    },
    atualizarAlbum: async (formInfo, fotos, nomeUsuario, albumId) => {
        let album = await Album.findByPk(albumId, {include:{ model: Usuario}});
        if (album.usuario.nomeUsuario == nomeUsuario) {
            await album.update({ titulo: formInfo.titulo });
            for (let index = 0; index < fotos.length; index++) {
                await Foto.create({
                    nomeFoto: fotos[index],
                    titulo: formInfo[index],
                    albumId: album.id,
                    usuarioId: album.usuario.id
                });
            }
            return album;
        }
    },
    excluirAlbum: async (nomeUsuario, albumId) => {
        let album = await Album.findByPk(albumId, { include: ['usuario'] });
        if (album) {
            if (album.usuario.nomeUsuario == nomeUsuario) {
                await album.destroy();
                return;
            }
        }
        throw new Error("Nenhum álbum encontrado.");
    },
    excluirFoto: async (nomeUsuario, fotoId) => {
        let foto = await Foto.findByPk(fotoId, { include: { all: true, nested: true } });
        let usuario = foto.album.usuario;
        if (usuario.nomeUsuario == nomeUsuario) {
            await foto.destroy();
            return;
        }
        throw new Error("Nenhum álbum encontrado.");
    },
    buscarFoto: async (nomeFoto) => {
        let foto = await Foto.findOne({ where: { 'nomeFoto': nomeFoto } });
        if (foto) {
            let caminho = path.resolve(caminhoArmazenamento, foto.nomeFoto);
            return caminho;
        }
    },
}