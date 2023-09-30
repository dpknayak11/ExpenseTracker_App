// Require the modules
const Sequelize = require('sequelize');

// Create the connection object
const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql'
  });

// Export the connection object
module.exports = sequelize;