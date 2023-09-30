const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
// const authMiddleware = require("../middlewares/auth");
const authenticate = require('../middleware/auth.js');

router.get('/get-expense', expenseController.getHomePage);
// router.get('/get-expense-data',authenticate,expenseController.getExpenseData);
router.get("/getAllExpenses/:page", authenticate, expenseController.getAllExpensesforPagination);
router.post('/post-expense', authenticate, expenseController.postExpense);

router.post('/delete-expense', authenticate, expenseController.deleteExpense);

module.exports = router;