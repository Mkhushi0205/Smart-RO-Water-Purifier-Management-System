const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("=================================");
        console.log("MongoDB Connected Successfully!");
        console.log("Host: ", conn.connection.host);
        console.log("Database: ", conn.connection.name);
        console.log("=================================");

        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error("MongoDB Connection Failed!");
        console.log(error.message);
        throw error;
        
        // process.exit(1);
    }
};

module.exports = connectDB;