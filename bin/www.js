
const path = require('path');
const dotenv = require('dotenv').config;

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {

  dotenv({
    path: path.resolve(__dirname, '../dev.env'),
  });
}

const debug = require('debug')('backend-bootcamp-db1-2023:server');
const http = require('http');

const app = require('../app');
const sequelize = require('../database/sequelize');

function normalizePort(val) {
  const portNumber = parseInt(val, 10);

  if (Number.isNaN(portNumber)) {

    return val;
  }

  if (portNumber >= 0) {

    return portNumber;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);

  sequelize.authenticate()
    .then(() => {
      console.warn('Conectado com sucesso ao banco e dados!');

      return sequelize.sync({ alter: true });
    })
    .catch((error) => {
      console.warn('Erro ao conectar ao banco e dados:', error);
    });
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
