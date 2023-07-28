const express = require('express');

const { middlewareAutenticacao } = require('../middlewares/autenticacao');
const Tarefas = require('../models/Tarefas');
const { checarResultadoValidacao } = require('../validators');
const {
  validadorCadastroTarefa, validadorAtualizacaoTarefa,
} = require('../validators/tarefas');

const router = express.Router();

/**
 * Cadastro de tarefas para o usuário logado
 */
router.post(
  '/',
  middlewareAutenticacao,
  validadorCadastroTarefa,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { usuarioLogado, body } = req;
      
      const { titulo, concluida } = body;

      const tarefa = await Tarefas.create({
        titulo,
        concluida,
        usuario_id: usuarioLogado.id,
      });

      res.status(201).json(tarefa);

      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Consulta de tarefas do usuário logado
 */
router.get(
  '/',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado } = req;
      
      const tarefas = await Tarefas.findAll({
        where: {
          usuario_id: usuarioLogado.id,
        },
      });

      res.status(200).json(tarefas)
    
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Retorna tarefa por ID do usuário logado
 */
router.get(
  '/:tarefaId',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      
      const { tarefaId } = params;

      const tarefa = await Tarefas.findOne({
        where: {
          id: tarefaId,
          usuario_id: usuarioLogado.id,
        },
      });

      if(!tarefa) {
        res.status(404).send('Tarefa não encontrada');
        return;
      }

      res.status(200).json(tarefa);

      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Atualiza a tarefa alterando o valor da coluna "concluida" para true ou false.
 *
 * Em caso de sucesso retorna o objeto da tarefa atualizada.
 *
 * Caso não encontre a tarefa retorna "null".
 *
 * @param {number} usuarioId
 * @param {number} tarefaId
 * @param {boolean} concluida
 * @returns {object|null}
 */
const atualizaSituacaoTarefa = async (usuarioId, tarefaId, concluida) => {
  const tarefa = await Tarefas.findOne({
    where: {
      id: tarefaId,
      usuario_id: usuarioId,
    },
  });

  if (!tarefa) {
    return null;
  }

  /**
   * Atualiza o valor da coluna "concluida"
   * Docs: https://sequelize.org/docs/v6/core-concepts/model-instances/#updating-an-instance
   */
  tarefa.concluida = concluida;
  await tarefa.save();

  return tarefa;
};

/**
 * Marca a tarefa do usuário como concluída
 */
router.put(
  '/:tarefaId/concluida',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      const { tarefaId } = params;

      const tarefa =  await atualizaSituacaoTarefa(usuarioLogado.id, tarefaId, true);

      if(!tarefa) {
        res.status(404).json('Tarefa não encontrada');
        return;
      }

      res.status(200).json(tarefa);

      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Marca a tarefa do usuário como pendente
 */
router.put(
  '/:tarefaId/pendente',
  middlewareAutenticacao,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      const { tarefaId } = params;

      const tarefa =  await atualizaSituacaoTarefa(usuarioLogado.id, tarefaId, false);

      if(!tarefa) {
        res.status(404).json('Tarefa não encontrada');
        return;
      }

      res.status(200).json(tarefa);
      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/**
 * Atualiza os dados da tarefa do usuário de forma parcial
 */
router.patch(
  '/:tarefaId',
  middlewareAutenticacao,
  validadorAtualizacaoTarefa,
  async (req, res) => {
    if (checarResultadoValidacao(req, res)) {
      return;
    }

    try {
      const { usuarioLogado, params, body } = req;

      const { tarefaId } = params;
      const { titulo, concluida } = body;

      const result = await Tarefas.update({titulo,concluida},
        {
          where: {
            id: tarefaId,
            usuario_id: usuarioLogado.id,
          },
        });

        const registroAtualizados = result[0];
       
        const tarefa = await Tarefas.findOne({
          where: {
            id: tarefaId,
            usuario_id: usuarioLogado.id,
          },
        });

        if (!registroAtualizados) {
          res.status(404).send('Tarefa não encontrada');
          return;
        }


        res.status(200).json(tarefa);
      // TODO: implementar aqui
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

// Rota de esclusão de tarefas
// Delete/tarefas/1

router.delete(
  '/:tarefaId',
  middlewareAutenticacao,
  async (req,res) => {
    try {
      const {usuarioLogado, params} = req;
      const {tarefaId} = params;

      const result = await Tarefas.destroy({
        where: {
          id: tarefaId,
          usuario_id: usuarioLogado.id,
        },
      });
      
      if(!result) {
        res.status(404).send('Tarefa não encontrada');
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  }
)

module.exports = router;
