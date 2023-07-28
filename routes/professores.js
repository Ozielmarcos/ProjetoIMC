const express = require('express');
const { ValidationError } = require('sequelize');

const Professores = require('../models/Professores');
const { compararSenha } = require('../utils/senha');
const { gerarTokenUsuario } = require('../utils/token');
const { checarResultadoValidacao } = require('../validators');
const { validadorLogin, validadorCadastroUsuario } = require('../validators/professor');

const router = express.Router();

function erroEmailDuplicado(error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation'
    && databaseError.path === 'usuario_email_unico'
  ));
}


// Cadastro de usuários

router.post(
  '/cadastro',
  validadorCadastroUsuario,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { nome, email, senha } = req.body;

      const resultado = await Professores.create({
        nome,
        email,
        senha,
      });

      const professor = await Professores.findByPk(resultado.get('id'));
      res.status(201).json(professor);

    } catch (error) {
      console.warn(error);
      if (erroEmailDuplicado(error)) {
        res.status(402).send('E-mail já cadastrado!');
        return;
      }
      res.status(500).send();
    }
  },
);


// Login de usuários

router.post(
  '/login',
  validadorLogin,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { email, senha } = req.body;

      const professor = await Professores.unscoped().findOne({
        where: {
          email,
        },
      });

      if (!professor) {
        res.status(401).send('Credenciais inválidas');
        return;
      }

      if (!compararSenha(senha, professor.get('senha'))) {
        res.status(401).send('Credenciais inválidas');
        return;
      }

      const professorJson = professor.toJSON();
      delete professorJson.senha;

      const token = gerarTokenUsuario(professorJson);

      res.status(200).json({
        token,
        usuario: professorJson,
      });
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

module.exports = router;
