const usuarioService = require("../Services/usuarioService");
const jwt_decode = require('jwt-decode')
const path = require("path");
const ImagemService = require("../Services/ImagemService");
module.exports = {
    registro: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            resultado.mensagem = await usuarioService.registro(req.body);
            resultado.error = false;
            return res.status(201).json(resultado);
        }
        catch (e) {
            console.log('ERRO: ' + e.message);
            resultado = { error: true, mensagem: 'Dados inválidos. Registro não realizado.' };
            return res.status(400).json(resultado);
        }
    },
    login: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            resultado.error = false;
            resultado.mensagem = await usuarioService.login(req.body);
            return res.status(201).json(resultado);
        }
        catch (e) {
            console.log('ERRO: ' + e.message);
            resultado = { error: true, mensagem: 'Dados inválidos. Login não realizado.' };
            return res.status(400).json(resultado);
        }
    },
    verificarToken: async (req, res) => {
        return res.status(200).json({ error: false, mensagem: 'Token válido.' });
    },
    alterar: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            let usuario = await usuarioService.alterar(req.body);
            resultado.error = false;
            resultado.mensagem = `Alteração bem sucedida as: ${usuario.updatedAt}.`
            return res.status(201).json(resultado);
        }
        catch (e) {
            console.log('ERRO: ' + e.message);
            resultado = { error: true, mensagem: 'Dados inválidos. Alteração não efetudada.' };
            return res.status(400).json(resultado);
        }
    },
    buscarPerfil: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data: FormData };
        let usuario;
        try {
            if (req.params.nomeUsuario) {
                usuario = await usuarioService.buscarPerfil(req.params.nomeUsuario);

            } else if (req.headers['authorization']) {
                let payloadToken = jwt_decode(req.headers['authorization'])
                usuario = await usuarioService.buscarPerfil(payloadToken.nomeUsuario);

            }
            if (usuario) {
                resultado.error = false;
                resultado.mensagem = "Busca bem sucedida!";
                resultado.data = usuario;
                return res.status(200).json(resultado)
            }
        }
        catch (e) {
            console.log(e.message)
            resultado = { error: true, mensagem: 'Erro ao encontrar usuário: Usuário inexistente.' };
            return res.status(404).json(resultado);
        }
    },
    atualizar: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        let usuario;
        try {
            if (req.headers['authorization']) {
                let payloadToken = jwt_decode(req.headers['authorization'])
                let fotoPerfil;
                if (req.files[0]) {
                    fotoPerfil = req.files[0].filename;
                    req.body['fotoPerfil'] = req.files[0].filename;
                }
                usuario = await usuarioService.atualizar(payloadToken.nomeUsuario, req.body, fotoPerfil);
            }
            if (usuario) {
                resultado.error = false;
                resultado.mensagem = usuario;
                return res.status(200).json(resultado)
            }
        }
        catch (e) {
            console.log(e.message)
            resultado = { error: true, mensagem: 'Erro ao encontrar usuário: Usuário inexistente.' };
            return res.status(404).json(resultado);
        }
    },
    buscarPerfilInfo: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data: FormData };
        try {
            
            let payloadToken = await jwt_decode(req.headers['authorization']);
            resultado.error = false;
            resultado.mensagem = "Busca bem sucedida."
            resultado.data = await usuarioService.buscarPerfilInfo(payloadToken.nomeUsuario);
            return res.status(200).json(resultado);

        }
        catch (e) {
            console.log(e.message)
            resultado = { error: true, mensagem: 'Erro ao encontrar usuário: Usuário inexistente.' };
            return res.status(404).json(resultado);
        }
        return;
    }
}