const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./config/db");
const authRoutes = require("./routes/authRouter");
const app = express();
const expenseRouter = require("./routes/expenseRouter");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

db();

app.use(cors({
    origin: "http://localhost:5174", 
    credentials: true
}));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("API is running....");
});
app.use('/api/auth',authRoutes);
app.use('/api/expense',expenseRouter);
//routers can be added here app.use();
const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});