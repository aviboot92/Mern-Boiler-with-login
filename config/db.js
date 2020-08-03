const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () =>{
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MonogoDb connected");
    } catch(err){
        console.log('Error in Mongo DB connection',err);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;