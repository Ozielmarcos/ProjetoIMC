const jwt = require('jsonwebtoken');

const { JWT_TOKEN } = process.env;


// Gera o token JWT para o usuário com validade de 7 dias.

const gerarTokenUsuario = (professor) => jwt.sign(professor, JWT_TOKEN, {
  expiresIn: '7d',
});


// Valida o token JWT fornecido e retorna o payload caso esteja válido.

const validarTokenUsuario = (token) => jwt.verify(token, JWT_TOKEN);

module.exports = {
  gerarTokenUsuario,
  validarTokenUsuario,
};
