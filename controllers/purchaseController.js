const path = require('path')
const Razorpay = require("razorpay");
const Order = require('../models/ordersModel')
const User = require('../models/userModel')

const purchaseMemberShip = async (req, res, next) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const options = { amount: 5000, currency: "INR" }
    const order = await instance.orders.create(options);
    console.log('order', order);
    try {
        await Order.create({ orderId: order.id, status: 'PENDING', userId: req.user.id });
        res.status(201).json({ order, key_id: instance.key_id })
    } catch (err) { console.log(err) }
}
const updateTransactionStatus = async (req, res, next) => {
    const { order_id, payment_id, payment_failed } = req.body;
    try {
        if (payment_failed === true) {
            const failure = await Order.create(
                { orderId: order_id, status: "fail" },
                { where: { orderId: order_id } }
            );
            console.log("failure", failure);
            await User.update({ isPremimum: false }, { where: { id: req.user.id } });
            console.log("Transaction marked as failed due to payment failure");
        }

        else {
            await Order.update(
                { paymentId: payment_id, orderId: order_id, status: "successful" },
                { where: { userId: req.user.id } }
            );
            await User.update({ isPremimum: true }, { where: { id: req.user.id } });
            console.log("Transaction and user details updated successfully");
        }
        res.status(202).json({ success: true, message: "Transaction status updated" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating transaction status" });
    }
}

module.exports = { purchaseMemberShip, updateTransactionStatus };
