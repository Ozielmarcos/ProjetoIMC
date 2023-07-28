const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


// Faz o hash da senha do usuário para armazenar no banco e dados usando bcrypt.

const hashSenha = (senha) => bcrypt.hashSync(senha, salt);


//Compara a senha original ao hash gerado pelo bcrypt, para verificar se são equivalentes.

const compararSenha = (senha, hash) => bcrypt.compareSync(senha, hash);

module.exports = {
  hashSenha,
  compararSenha,
};
