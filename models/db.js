const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/studentDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        });
        console.log('Connection Succeeded');
    } catch (err) {
        console.log('Error in connection: ' + err);
    }
}

connectDB();

require('./student.model');
