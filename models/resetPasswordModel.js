const Sequelize = require("sequelize");
const sequelize = require("../connections/database");

const ResetPassword = sequelize.define("ResetPassword", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  isactive: Sequelize.BOOLEAN,
});

module.exports = ResetPassword;