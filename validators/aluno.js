const { checkSchema } = require('express-validator');

const validadorCadastroAluno = checkSchema(
  {
    nome: {
      notEmpty: {
        errorMessage: 'O campo nome é obrigatário'
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'O campo nome deve ter pelo menos 3 caracteres'
      },
      isString: {
        errorMessage: 'O campo nome deve ser uma string'
      },
    },
    email: {
      notEmpty: {
        errorMessage: 'O campo email é obrigatário'
      },
      isEmail: {
        errorMessage: 'O campo email deve ser um email válido'
      },
    },
    idade: {
      notEmpty: {
        errorMessage: 'O campo idade é obrigatório'
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'O campo deve ter pelo menos um digito'
      },
      isInt: {
        errorMessage: 'O campo idade deve ser um némero inteiro'
      }
    },
    sexo: {
      notEmpty: {
        errorMessage: 'O campo sexo é obrigatário'
      },
      isString: {
        errorMessage: 'O campo sexo deve ser uma string'
      }
    },
    peso: {
      notEmpty: {
        errorMessage: 'O campo peso é obrigatário'
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'O campo deve ter pelo menos um digito'
      },
      isFloat: {
        errorMessage: 'O campo peso deve ser um número'
      }
    },
    altura: {
      notEmpty: {
        errorMessage: 'O campo altura é obrigatário'
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'O campo deve ter pelo menos um digito'
      },
      isFloat: {
        errorMessage: 'O campo altura deve ser um número'
      }
    }
  }, ['body'],);

const validadorAtualizacaoAluno = checkSchema(
  {
    nome: {
      notEmpty: {
        errorMessage: 'O campo nome é obrigatário'
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'O campo nome deve ter pelo menos 3 caracteres'
      },
      isString: {
        errorMessage: 'O campo nome deve ser uma string'
      },
    },
    email: {
      notEmpty: {
        errorMessage: 'O campo email é obrigatário'
      },
      isEmail: {
        errorMessage: 'O campo email deve ser um email válido'
      },
    },
    idade: {
      notEmpty: {
        errorMessage: 'O campo idade é obrigatório'
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'O campo deve ter pelo menos um digito'
      },
      isInt: {
        errorMessage: 'O campo idade deve ser um némero inteiro'
      }
    },
    sexo: {
      notEmpty: {
        errorMessage: 'O campo sexo é obrigatário'
      },
      isString: {
        errorMessage: 'O campo sexo deve ser uma string'
      }
    },
    peso: {
      notEmpty: {
        errorMessage: 'O campo peso é obrigatário'
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'O campo deve ter pelo menos um digito'
      },
      isFloat: {
        errorMessage: 'O campo peso deve ser um número'
      }
    },
    altura: {
      notEmpty: {
        errorMessage: 'O campo altura é obrigatário'
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'O campo deve ter pelo menos um digito'
      },
      isFloat: {
        errorMessage: 'O campo altura deve ser um número'
      }
    }
  }, ['body'],);

module.exports = {
  validadorCadastroAluno, validadorAtualizacaoAluno
};
