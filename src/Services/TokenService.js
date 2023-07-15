const jwt = require("jsonwebtoken");
module.exports = {
    verificarToken:async(req, res, next)=> {
        const autorizacaoHeader = req.headers['authorization'];
        const token = autorizacaoHeader && autorizacaoHeader.split(" ")[1];
        try {
            if (!token) {
                return res.status(401).json({ erro: true, mensagem: "Acesso negado." });
            }
            const secret = process.env.JWT_SECRET;
            jwt.verify(token, secret);
            next();
        } catch (e) {
            return res.status(403).json({ erro: true, mensagem: "Token inválido." });

        }
    }
}
