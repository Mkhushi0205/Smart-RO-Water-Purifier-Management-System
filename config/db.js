const mongoose = require("mongoose");

let  isConnected = false;

const connectDB = async () => {
    try {
        if (isConnected || mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing. Set it in Vercel → Settings → Environment Variables.");
        }
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000
            });
            isConnected = true;
            console.log("MongoDB Connected:", conn.connection.host);
            return conn;
        } catch (error) {
            console.log("MongoDB Connection Failed:", error.message);
            throw error;
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