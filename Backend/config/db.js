const mongoose = require("mongoose")

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL ,{});
        
    }
    catch(err){
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }

};

module.exports = connectDb;