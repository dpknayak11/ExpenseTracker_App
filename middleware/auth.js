const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const userAuthenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log("Token auth: ", token);
    if (!token) { return res.status(401).json({ message: "Unauthorized users" }) }
    const user = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log('auth userId: ', user.userId);
    try {
        const resUser = await User.findByPk(user.userId);
        if (!resUser.id) { return res.status(403).json({ message: "primary key not found" }); }
        else {
            console.log('auth resUserId : ', resUser.id);
            req.user = resUser
            next();
        }
    } catch (err) { return res.status(403).json({ message: "Token is not valid" })}
}

module.exports = userAuthenticate;