const path = require("path");
const sequelize = require('../connections/database')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel');

const getLeaderboardPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "views", "leaderboard-page.html"));
  } catch { (err) => console.log(err); }
};


const showLeaderBoard = async (req, res) => {
    try {
        const userLeaderBoardData = await User.findAll({
            attributes: ['id', 'name','totalExpenses'],
            order:[['totalExpenses', 'DESC']]
        });
        res.status(200).json(userLeaderBoardData);
    } catch (err) { res.status(500).json(err); }
}

module.exports = {   showLeaderBoard, getLeaderboardPage }


//   We cane use this same method : .....
 

// const userLeaderBoardData = await User.findAll({
//     attributes: ['id', 'name',[sequelize.fn('SUM', sequelize.col("expenses.amount")),'total_cost']],
//     include:[{ model : Expense , attributes:[] }],
//     group: ['user.id'],
//     order:[['total_cost', 'DESC']]
// });
// res.status(200).json(userLeaderBoardData);



//   We cane use this same method : ......

// const users = await User.findAll();
// const expenses = await Expense.findAll();

// const userNdExpenses = {};
// console.log("all expenses :", expenses);
// console.log("all users :", users);

// expenses.forEach((expense) => {
//     if (userNdExpenses[expense.userId]) {
//         userNdExpenses[expense.userId] = userNdExpenses[expense.userId] + expense.amount;
//     } else { userNdExpenses[expense.userId] = expense.amount }
// });

// var userLeaderBoardData = [];
// users.forEach((user) => {
//     userLeaderBoardData.push({
//         name: user.name,
//         total_cost: userNdExpenses[user.id] || 0
//     })
// })

// console.log(userLeaderBoardData);
// userLeaderBoardData.sort((a, b) => b.total_cost - a.total_cost);
// res.status(200).json(userLeaderBoardData);