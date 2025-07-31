//const {protect} = require("../middlewares/authMiddleware");
const Expense = require("../models/Expense");

exports.createExpense = async(req,res)=>{
    try{
        const {title,amount,category,date} = req.body;
        const expense = new Expense({
            user:req.user._id,
            title,
            amount,
            category,
            date
        });
        const savedExpense = await expense.save();
        res.send(201).json(savedExpense);
    }catch(err){
        res.send(400).json({message:"Data has not saved!!",err});
    }
}
exports.fetchExpense = async(req,res)=>{
    try{
        const fetchedData = await Expense.findOne({user:req.user._id}).sort({date:-1});
        res.status(200).json(fetchedData);
    }catch(err){
        res.send(400).json({message:"Unable to fetch data!!",err});
    }
}
