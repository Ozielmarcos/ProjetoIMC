const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Usuarios = require('./Usuarios');

const Tarefas = sequelize.define(
  'tarefas',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {

    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',


    indexes: [
      {
        type: 'FULLTEXT',
        fields: ['titulo'],
      },
    ],
  },
);

Tarefas.belongsTo(Usuarios, {
  as: 'usuarios',
  targetKey: 'id',
  foreignKey: 'usuario_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Tarefas;
