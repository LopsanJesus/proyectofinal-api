const models = require('../models');

models.sequelize.authenticate();
models.sequelize.sync();