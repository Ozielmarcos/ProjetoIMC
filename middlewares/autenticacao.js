const Usuarios = require('../models/Usuarios');
const { validarTokenUsuario } = require('../utils/token');

const obtemTokenAutenticacao = (authorization) => {
  if (!authorization) return null;

  const partes = authorization.split(' ');
  return partes[1];
};

const middlewareAutenticacao = async (request, response, next) => {
  const token = obtemTokenAutenticacao(request.headers.authorization);

  if (!token) {
    response.status(401).send('Token não informado.');
    return;
  }

  try {
    const payload = validarTokenUsuario(token);

    const usuario = await Usuarios.findByPk(payload.id);

   if(!usuario) {
    response.status(401).send('Usuário não autorizado.');
    return;
   }

   request.usuarioLogado = usuario.toJSON();

    next();
  } catch (error) {
    console.warn(error);
    response.status(401).send('Token inválido.');
  }
};

module.exports = {
  middlewareAutenticacao,
};
