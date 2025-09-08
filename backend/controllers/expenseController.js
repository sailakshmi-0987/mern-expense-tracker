//const {protect} = require("../middlewares/authMiddleware");
const { getCategoryFromDescription } = require('../utils/aiCategory');
const Expense = require("../models/Expense");
const { findOneAndDelete } = require("../models/User");

const createExpense = async(req,res)=>{
    try{
        const {title,amount,category,date} = req.body;
        const finalCategory = category || await getCategoryFromDescription(title);
        const expense = new Expense({
            user:req.user._id,
            title,
            amount,
            category:finalCategory,
            date
        });
        const savedExpense = await expense.save();
        res.send(201).json(savedExpense);
    }catch(err){
        res.send(400).json({message:"Data has not saved!!",err});
    }
}
const fetchExpense = async (req, res) => {
    try {
        const { category, fromDate, toDate, minAmount, maxAmount } = req.query;

        // Build filter object
        const filter = { user: req.user.id };

        if (category) {
            filter.category = category;
        }

        if (fromDate && toDate) {
            filter.date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            };
        }

        if (minAmount && maxAmount) {
            filter.amount = {
                $gte: Number(minAmount),
                $lte: Number(maxAmount),
            };
        }

        const expenses = await Expense.find(filter).sort({ date: -1 });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch expenses", error });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;
        const updatedData = req.body;
        const expense = await Expense.findOne({ _id: expenseId, user: userId });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        Object.assign(expense, updatedData);

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        res.status(500).json({ message: "Failed to update expense", error });
    }
};
const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;
        const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete expense", error });
    }
};
module.exports = {createExpense,fetchExpense,updateExpense,deleteExpense};
