const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser} = require("../controllers/authController");
const {addBlacklist} = require("../utils/tokenBlackList");
const {protect} = require("../middlewares/authMiddleware");
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',protect,logoutUser);
module.exports = router;