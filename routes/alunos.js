const express = require('express');

const { middlewareAutenticacao } = require('../middlewares/autenticacao');
const Alunos = require('../models/Alunos');
const { checarResultadoValidacao } = require('../validators');
const { validadorCadastroAluno, validadorAtualizacaoAluno, } = require('../validators/aluno');
const { classificarIMC, calcularIMC } = require('../utils/imc');

const router = express.Router();


//Cadastro de tarefas para o usuário logado

router.post(
  '/',
  middlewareAutenticacao,
  validadorCadastroAluno,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { professorLogado, body } = req;

      const { nome, email, sexo, idade, peso, altura, imc, classificacao, avaliacao } = body;

      const aluno = await Alunos.create({
        nome,
        email,
        sexo,
        idade,
        peso,
        altura,
        imc,
        classificacao,
        avaliacao,
        id_professor: professorLogado.id,
      });

      await Alunos.findByPk(aluno.get('id'));
      res.status(201).json(aluno);

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);


// Consulta de tarefas do usuário logado

router.get(
  '/',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { professorLogado } = req;

      const aluno = await Alunos.findAll({
        where: {
          id_professor: professorLogado.id,
        },
      });

      res.status(200).json(aluno)

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

// Retorna tarefa por ID do usuário logado

router.get(
  '/:alunoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { professorLogado, params } = req;


      const { alunoId } = params;

      const aluno = await Alunos.findOne({
        where: {
          id: alunoId,
          id_professor: professorLogado.id,
        },
      });

      if (!aluno) {
        res.status(404).send('Tarefa não encontrada');
        return;
      }

      res.status(200).json(aluno);

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

// Atualiza os dados da tarefa do usuário de forma parcial

router.patch(
  '/:alunoId',
  middlewareAutenticacao,
  validadorAtualizacaoAluno,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { professorLogado, body, params } = req;

      const { alunoId } = params;

      const { nome, email, sexo, idade, peso, altura, } = body;

      const imc = calcularIMC(peso, altura);

      const classificacao = classificarIMC(imc);

      const avaliacao = new Date();

      await Alunos.update({
        nome,
        email,
        sexo,
        idade,
        peso,
        altura,
        imc,
        classificacao,
        avaliacao,
      }, {
        where: {
          id: alunoId,
          id_professor: professorLogado.id,
        }
      });

      const aluno = await Alunos.findOne({
        where: {
          id: alunoId,
          id_professor: professorLogado.id,
        }
      });

      if (!aluno) {
        res.status(404).send('Aluno não cadastrado para esse professor ou não existente');
        return;
      }
      res.status(200).json(aluno);
    } catch (e) {
      console.warn(e);
      res.status(500).send();

    }
  }
);

// Rota de esclusão de tarefas

router.delete(
  '/:alunoId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { professorLogado, params } = req;

      const { alunoId } = params;

      const aluno = await Alunos.findOne({
        where: {
          id: alunoId,
          id_professor: professorLogado.id,
        }
      });

      if (!aluno) {
        res.status(404).send('Aluno não cadastrado para esse professor ou não existente');
        return;
      }
      await Alunos.destroy({
        where: {
          id: alunoId,
          id_professor: professorLogado.id,
        }
      });
      res.status(200).send('Aluno deletado com sucesso');
    } catch (e) {
      console.warn(e);
      res.status(500).send();
    }

  }
);

module.exports = router;
