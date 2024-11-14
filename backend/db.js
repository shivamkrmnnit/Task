const mongoose = require("mongoose");



// const mongoURI = "mongodb://127.0.0.1:27017/dd";
const mongoURI = "mongodb+srv://shivamkr:shivamkr@cluster0.kv9z8q7.mongodb.net/"


const connectToMongo = async ()=>{
    try{
    await mongoose.connect(mongoURI)
        console.log("connected to mongo successfully");
    
}catch(error){
    console.error("Not connected to db");
    process.exit(0);

}

};

module.exports = connectToMongo;