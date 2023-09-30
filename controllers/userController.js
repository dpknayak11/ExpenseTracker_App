const path = require('path')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const getUserLogIn = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
}
function generateAccessToken(id, name, ispremiumuser) {
    return jwt.sign({ userId: id, name: name, ispremiumuser },process.env.TOKEN_SECRET);
}
// const isPremiumUser = async (req, res, next) => {
//     const user = req.user.isPremiumUser
//     console.log("isPremiumUser:",user);
//     try {
//       if (user) { return res.json({ isPremiumUser: true }); }
//     } catch (error) {  console.log(error);}
//   };

const postUserLogIn = async (req, res, next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) { return res.status(500).json({ success: false, message: "Something went Wrong!" }) }
                else if (result == true) {
                    return res.status(200).json({
                        success: true,
                        message: "Login Successful!",
                        token: generateAccessToken(user.id, user.name, user.isPremimum)
                    });
                }
                else { return res.status(401).json({ success: false, message: "Password Incorrect!" }) }
            })
        }
        else { return res.status(404).json({ success: false, message: "User doesn't Exists!" }) }
    } catch (err) { res.status(500).json({ message: 'Internal Server Error' }) }
}

const postUserSingUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (user) { return res.status(404).json({ message: "This Email-Id User already exists!" }) }
        else {
            bcrypt.hash(password, 10, async (err, hashPswd) => {
                if (err) { return res.status(500).json({ message: "something went wrong" }) }
                else {
                    const userDetails = await User.create({ name: name, email: email, password: hashPswd });
                    console.log("userDetails: ", userDetails)
                    return res.status(201).send(`<script>alert('User Created Successfully!'); window.location.href='/'</script>`);
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { getUserLogIn, postUserLogIn, postUserSingUp }