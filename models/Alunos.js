const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Professores = require('./Professores');
const { calcularIMC, classificarIMC } = require('../utils/imc');

const Alunos = sequelize.define(
  'alunos',
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
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imc: {
      type: DataTypes.FLOAT,
      allowNull: true,
      set() {
        const peso = this.getDataValue('peso');
        const altura = this.getDataValue('altura');
        const novoIMC = calcularIMC(peso, altura).toFixed(2);
        this.setDataValue('imc', novoIMC);
      }
    },
    classificacao: {
      type: DataTypes.STRING,
      allowNull: true,
      set() {
        const imc = this.getDataValue('imc');
        const classificacao = classificarIMC(imc);
        this.setDataValue('classificacao', classificacao);
      }
    },
    avaliacao: {
      type: DataTypes.STRING,
      allowNull: true,
      set() {
        this.setDataValue('avaliacao', new Date().toLocaleString());
      }
    },
    id_professor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
);

Alunos.belongsTo(Professores, {
  as: 'professor',
  targetKey: 'id',
  foreignKey: 'id_professor',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

module.exports = Alunos;
