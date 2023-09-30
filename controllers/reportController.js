const path = require("path");
const Expense = require('../models/expenseModel')
const { Op } = require("sequelize");

exports.getReportPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "views", "report-page.html"));
  } catch { (err) => console.log(err); }
};

exports.dailyReports = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.body.date;
    const expenses = await Expense.findAll({
      where: { date: date, userId: userId },
    });
    return res.send(expenses);
  } catch (error) { console.log(error); }
}

exports.monthlyReports = async (req, res, next) => {
  try {
    const month = req.body.month;
    const expenses = await Expense.findAll({
      where: {
        date: { [Op.like]: `%-${month}-%` },
        userId: req.user.id,
      },
      raw: true,
    });
    return res.send(expenses);
  } catch (error) { console.log(error); }
}