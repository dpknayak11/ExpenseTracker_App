const Sequelize = require('sequelize');
const sequelize = require('../connections/database');

const Order = sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING,
    // userdetailId: Sequelize.INTEGER,
})
module.exports = Order;
