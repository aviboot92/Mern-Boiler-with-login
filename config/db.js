const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
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