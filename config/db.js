const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
    // Already connected
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // MONGO_URI missing
    if (!process.env.MONGO_URI) {
        throw new Error(
            "MONGO_URI is missing. Add it in Vercel → Settings → Environment Variables."
        );
    }

    // Reuse an existing connection attempt
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 10000
            }
        ).then((connection) => {
            console.log(
                "MongoDB Connected:",
                connection.connection.host
            );

            console.log(
                "MongoDB Database:",
                connection.connection.name
            );

            return connection;
        }).catch((error) => {
            console.error(
                "MongoDB Connection Failed:",
                error.message
            );

            // Allow another request/cold start to retry
            connectionPromise = null;

            throw error;
        });
    }

    return connectionPromise;
};

module.exports = connectDB;