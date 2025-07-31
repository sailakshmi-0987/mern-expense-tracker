const mongodb = require("mongoose");
const connectdb = async ()=>{
    await mongodb.connect(
        process.env.mongo_url
    );
}

module.exports=connectdb;