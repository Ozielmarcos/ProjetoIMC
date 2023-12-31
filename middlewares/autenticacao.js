const Professor = require('../models/Professores');
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

    const professor = await Professor.findByPk(payload.id);

    if (!professor) {
      response.status(401).send('Professor não autorizado.');
      return;
    }

    request.professorLogado = professor.toJSON();

    next();
  } catch (error) {
    console.warn(error);
    response.status(401).send('Token inválido.');
  }
};

module.exports = {
  middlewareAutenticacao,
};
