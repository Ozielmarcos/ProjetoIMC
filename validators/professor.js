const { checkSchema } = require('express-validator');

const validadorLogin = checkSchema(
  {
    email: {
      isEmail: {
        errorMessage: 'Informe um email válido',
      },
      isLength: {
        options: {
          min: 1,
          max: 200,
        },
        errorMessage: 'O email deve ter no mínimo 1 e máximo 200 caracteres',
      },
    },
    senha: {
      notEmpty: {
        errorMessage: 'A senha é obrigatória',
      },
      isLength: {
        options: {
          min: 8,
          max: 30,
        },
        errorMessage: 'A senha deve ter no mínimo 8 e máximo 30 caracteres',
      },
    },
  }, ['body']);

const validadorCadastroUsuario = checkSchema(
  {
    nome: {
      notEmpty: {
        errorMessage: 'O nome é obrigatário',
      },
      isLength: {
        options: {
          min: 3,
          max: 200,
        },
        errorMessage: 'O nome deve ter no mínimo 3 e máximo 200 caracteres',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'Informe um email válido',
      },
      isLength: {
        options: {
          min: 1,
          max: 200,
        },
        errorMessage: 'O email deve ter no mínimo 1 e máximo 200 caracteres',
      },
    },
    senha: {
      notEmpty: {
        errorMessage: 'A senha é obrigatária',
      },
      isLength: {
        options: {
          min: 8,
          max: 30,
        },
        errorMessage: 'A senha deve ter no mínimo 8 e máximo 30 caracteres',
      },
    },
  }, ['body']);

module.exports = {
  validadorLogin,
  validadorCadastroUsuario,
};
