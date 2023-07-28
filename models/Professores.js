const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const { hashSenha } = require('../utils/senha');

const Professores = sequelize.define(
  'professores',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('senha', hashSenha(value));
      }
    },
  },
  {
    //index único, para evitar duplicidade de email

    indexes: [
      {
        name: 'professor_email_key',
        unique: true,
        fields: ['email'],
      }
    ],

    defaultScope: {
      attributes: {
        exclude: ['senha'],
      }
    },
  }
);

module.exports = Professores;
