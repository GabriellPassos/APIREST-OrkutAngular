const jwt_decode = require('jwt-decode')
const imagemService = require("../Services/ImagemService");
module.exports = {
    buscarFoto: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            let caminho = await imagemService.buscarFoto(req.params.nomeFoto);
            return res.sendFile(caminho);
        }
        catch (e) {
            resultado = { error: true, mensagem: 'Imagem não encontrada.' };
            return res.status(404).json(resultado);
        }
    },
    novoAlbum: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            let fotos = [];
            for (let index = 0; index < req.files.length; index++) {
                fotos.push(req.files[index].filename);
            }
            if (req.headers['authorization']) {
                let payloadToken = await jwt_decode(req.headers['authorization']);
                let album = await imagemService.novoAlbum(req.body, fotos, payloadToken.nomeUsuario);
                if (album) {
                    resultado = { error: false, mensagem: "Álbum criado com sucesso!" }
                    return res.status(201).json(resultado);
                }
            }
        }
        catch (e) {
            resultado = { error: true, mensagem: 'Falha ao criar álbum: Dados incoerentes' };
            return res.status(404).json(resultado);
        }
    },
    buscarAlbum: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data: {} };
        try {
            let nomeUsuario;
            if (req.params.nomeUsuario) {
                nomeUsuario = req.params.nomeUsuario
            }
            else {
                let payloadToken = jwt_decode(req.headers['authorization'])
                nomeUsuario = payloadToken.nomeUsuario;
            }
            let albums = await imagemService.buscarAlbum(nomeUsuario);
            if (albums) {
                resultado = { error: false, mensagem: "Album(s) encontrados.", data: albums }
                return res.status(200).json(resultado);
            }
        }
        catch (e) {
            resultado = { error: true, mensagem: `Falha ao buscar álbum(s)` };
            return res.status(404).json(resultado);
        }
    },
    buscarAlbumPorId: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data: {} };
        try {
            
            let albums = await imagemService.buscarAlbumPorId(req.params.albumId, req.params.nomeUsuario);
            if (albums) {
                resultado = { error: false, mensagem: "Album(s) encontrados.", data: albums }
                return res.status(200).json(resultado);
            }
        }

        catch (e) {
            resultado = { error: true, mensagem: `Falha ao buscar álbum(s)` };
            return res.status(404).json(resultado);
        }
    },
    excluirAlbum: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data: {} };
        try {
            if (req.headers['authorization'] && req.params.albumId) {
                let payloadToken = await jwt_decode(req.headers['authorization']);
                await imagemService.excluirAlbum(payloadToken.nomeUsuario, req.params.albumId);
                resultado = { error: false, mensagem: `Álbum ${req.params.albumId} excluido.` }
                return res.status(200).json(resultado);
            }
        }
        catch (e) {
            resultado = { error: true, mensagem: `Falha ao excluir álbum` };
            return res.status(404).json(resultado);
        }
    },
    atualizarAlbum: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };

        try {
            let fotos = [];
            let albumId = req.params.albumId;
            if (albumId) {

                for (let index = 0; index < req.files.length; index++) {
                    fotos.push(req.files[index].filename);
                }
                if (req.headers['authorization']) {
                    let payloadToken = await jwt_decode(req.headers['authorization']);
                    let album = await imagemService.atualizarAlbum(req.body, fotos, payloadToken.nomeUsuario, albumId);
                    if (album) {
                        resultado = { error: false, mensagem: "Álbum criado com sucesso!" }
                        return res.status(201).json(resultado);
                    }
                }
            }
            throw new Error();
        }
        catch (e) {
            resultado = { error: true, mensagem: 'Falha ao criar álbum: Dados incoerentes' };
            return res.status(404).json(resultado);
        }
    },
    excluirFoto: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data: {} };
        try {
            if (req.headers['authorization'] && req.params.fotoId) {
                let payloadToken = await jwt_decode(req.headers['authorization']);
                await imagemService.excluirFoto(payloadToken.nomeUsuario, req.params.fotoId);
                resultado = { error: false, mensagem: `Foto ${req.params.fotoId} excluida.` }
                return res.status(200).json(resultado);
            }
        }
        catch (e) {
            resultado = { error: true, mensagem: `Falha ao excluir foto` };
            return res.status(404).json(resultado);
        }
    }

}