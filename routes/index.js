const client = require('./client');
const loan = require('./loan');

module.exports = (app) => {
  app.use(client);
  app.use(loan);
};
