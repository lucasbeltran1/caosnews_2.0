const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Desarrollo_movil',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

