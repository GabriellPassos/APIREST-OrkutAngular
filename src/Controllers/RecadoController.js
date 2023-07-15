const { json } = require("sequelize");
const usuarioService = require("../Services/usuarioService");
const recadoService = require("../Services/RecadoService");
const jwt_decode = require('jwt-decode')
//const Resposta = require("../Models/Resposta");
const path = require("path")
module.exports = {
    novo: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            let payloadToken = jwt_decode(req.headers['authorization'])
            let fotos = [];
            for (let index = 0; index < req.files.length; index++) {
                fotos.push(req.files[index].filename);
            }
            if(req.body.mensagem.length > 0 || fotos.length > 0){
                await recadoService.novo(req.params.nomeUsuario, payloadToken.nomeUsuario, req.body.mensagem, fotos);
                resultado = { error: false, mensagem: 'Recado enviado com sucesso!' };
                return res.status(201).json(resultado);
            }
        }
        catch (e) {
            console.log('ERRO: ' + e.message);
            resultado = { error: true, mensagem: 'Erro ao enviar recado.' };
            return res.status(400).json(resultado);
        }
    },
    buscar: async (req, res) => {
        let resultado = { error: Boolean, mensagem: String, data:FormData };
        try {
            let nomeUsuario;
            if(req.params.nomeUsuario){
                nomeUsuario = req.params.nomeUsuario
            }
            else{
                let payloadToken = jwt_decode(req.headers['authorization'])
                nomeUsuario = payloadToken.nomeUsuario;
            }
            let recados = await recadoService.buscar(nomeUsuario);
            if (recados) {
                resultado.error = false;
                resultado.mensagem = "Busca bem sucedida!";
                resultado.data = recados;
                return res.status(201).json(resultado);
            }
        }
        catch (e) {
            console.log('ERRO: ' + e.message);
            resultado = { error: true, mensagem: 'Erro ao encontrar recados.' };
            return res.status(400).json(resultado);
        }
    },
    excluir:async (req, res) => {
        let resultado = { error: Boolean, mensagem: String };
        try {
            if (req.headers['authorization']) {
                let payloadToken = await jwt_decode(req.headers['authorization']);
                await recadoService.excluir(payloadToken.nomeUsuario, req.params.recadoId)
                resultado = { error: false, mensagem: 'Recado excluído com sucesso!' };
                return res.status(201).json(resultado);
            }    
        }
        catch (e) {
            console.log('ERRO: ' + e.message);
            resultado = { error: true, mensagem: 'Erro ao encontrar recados.' };
            return res.status(400).json(resultado);
        }
    },
}