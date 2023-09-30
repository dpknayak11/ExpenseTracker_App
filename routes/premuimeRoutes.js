const express = require('express');
const router = express.Router();
const purchase = require('../controllers/purchaseController');
const leaderboardController = require('../controllers/leaderboardController');
const reportController = require('../controllers/reportController');
const authenticate = require('../middleware/auth.js');

router.get('/purchaseMemberShip', authenticate, purchase.purchaseMemberShip);

router.post('/updatetransactionstatus', authenticate, purchase.updateTransactionStatus);

router.get('/leaderboard', leaderboardController.getLeaderboardPage);
router.get('/showLeaderBoard', authenticate, leaderboardController.showLeaderBoard);

router.get('/report', reportController.getReportPage);

router.post('/dailyreports', authenticate, reportController.dailyReports);
router.post('/monthlyReports', authenticate, reportController.monthlyReports)

module.exports = router;