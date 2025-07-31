const express = require("express");
const expenseRouter = express.Router();
const protect = require("../middlewares/authMiddleware");
const{createExpense,fetchExpense} = require("../controllers/expenseController");
expenseRouter.post('/create',protect,createExpense);
expenseRouter.post('/fetch',protect,fetchExpense);

module.exports = expenseRouter;