const mongoose = require("mongoose");
const User = require("User");
const expenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Expense',expenseSchema);