const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isBlacklisted } = require("../utils/tokenBlackList");

const protect = async (req, res, next) => {
    const token = req.cookies.token; // <-- read from cookie

    if (!token) {
        return res.status(401).json({ message: "Not Authorized, No token!" });
    }

    if (isBlacklisted(token)) {
        return res.status(400).json({ message: "Token is invalid or logged out!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Not Authorized, Invalid token!" });
    }
};

module.exports = { protect };
