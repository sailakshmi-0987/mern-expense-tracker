const express = require("express");
const expenseRouter = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const {createExpense,fetchExpense, updateExpense, deleteExpense} = require("../controllers/expenseController");
expenseRouter.post('/create',protect,createExpense);
expenseRouter.get('/fetch',protect,fetchExpense);
expenseRouter.patch('/update/:id',protect,updateExpense);
expenseRouter.delete('/delete/:id',protect,deleteExpense);

module.exports = expenseRouter;