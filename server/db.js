const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Vehicules = require('../lib/Vehicules.model.js')(sequelize, Sequelize);
db.Reparateurs = require('../lib/reparateurs.model.js')(sequelize, Sequelize);
db.Interventions = require('../lib/interventions.model.js')(sequelize, Sequelize);
db.Workers = require('../lib/workers.model.js')(sequelize, Sequelize);
 
module.exports = db;