// Require the modules
const Sequelize = require('sequelize');

// Create the connection object
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST_NAME,
    dialect: 'mysql'
  });

// Export the connection object
module.exports = sequelize;