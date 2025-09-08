const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {isBlacklisted} = require("../utils/tokenBlackList");

const protect = async(req,res,next)=>{
    token = req.headers.authorization;
    if(isBlacklisted){
        res.send(400).json({message:"Token is invalid or loggedOut!!"});
    }
    if(token && token.startsWith('Bearer')){
        try{
            const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET);
            req.user = await User.findOne(decoded.id).select("-password");
            next();
        }catch(err){
            res.send(401).json({message:"Not Authorized,Invalid token!!"});
        }
    }else{
        res.send(401).json({message:"Not Authorized,No token!!"});
    }
}
module.exports = {protect};