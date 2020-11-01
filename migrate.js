const models = require('./database/models');

models.sequelize.authenticate();
models.sequelize.sync();