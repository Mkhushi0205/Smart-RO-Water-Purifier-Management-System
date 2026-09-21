require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const { loadUser } = require("./middleware/auth");

const app = express();


// BASIC APP CONFIGURATION
app.set("trust proxy", 1);

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// STATIC FILES
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// BASIC MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// DATABASE + SESSION
let sessionMiddleware = null;

let sessionInitPromise = null;


async function getSessionMiddleware() {

    // Already initialized
    if (sessionMiddleware) {
        return sessionMiddleware;
    }


    // Prevent multiple initialization attempts
    if (!sessionInitPromise) {

        sessionInitPromise = (async () => {

            // Connect to MongoDB
            const connection = await connectDB();


            // IMPORTANT:
            // Use the SAME MongoDB client that
            // Mongoose is already using.
            const mongoClient =
                connection.connection.getClient();


            // Create MongoDB session store
            const sessionStore =
                MongoStore.create({

                    client: mongoClient,

                    collectionName: "sessions",

                    ttl: 60 * 60 * 24,

                    autoRemove: "native"

                });


            // Create Express session middleware
            sessionMiddleware = session({

                secret:
                    process.env.SESSION_SECRET ||
                    "smart-ro-secret",

                resave: false,

                saveUninitialized: false,

                store: sessionStore,

                cookie: {

                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite: "lax",

                    maxAge:
                        1000 *
                        60 *
                        60 *
                        24

                }

            });


            console.log(
                "Session store initialized successfully."
            );


            return sessionMiddleware;

        })().catch((error) => {

            // Allow another request to retry
            sessionInitPromise = null;

            throw error;

        });

    }


    return sessionInitPromise;
}


// SESSION INITIALIZATION
app.use(
    async (req, res, next) => {

        try {

            const middleware =
                await getSessionMiddleware();

            middleware(
                req,
                res,
                next
            );

        } catch (error) {

            console.error(
                "SESSION / DATABASE ERROR:",
                error
            );

            return res
                .status(500)
                .send(
                    "Database connection failed. Please try again shortly."
                );
        }

    }
);


// ROUTES
const mainRoutes =
    require("./routes/mainRoutes");

const authRoutes =
    require("./routes/authRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const customerRoutes =
    require("./routes/customerRoutes");

const technicianRoutes =
    require("./routes/technicianRoutes");

const adminTechnicianRoutes =
    require("./routes/adminTechnicianRoutes");

const AI_featureRoutes =
    require("./routes/AI_featureRoutes");

const productsRoutes =
    require("./routes/productsRoutes");

const serviceRoutes =
    require("./routes/serviceRoutes");

const contactRoutes =
    require("./routes/contactRoutes");

const roMachineRoutes =
    require("./routes/roMachineRoutes");

const serviceHistoryRoutes =
    require("./routes/serviceHistoryRoutes");

const technicianJobRoutes =
    require("./routes/technicianJobRoutes");


// LOAD CURRENT USER
app.use(loadUser);


// REGISTER ROUTES
app.use("/", mainRoutes);

app.use("/", authRoutes);

app.use("/", adminRoutes);

app.use("/", customerRoutes);

app.use("/", technicianRoutes);

app.use("/", adminTechnicianRoutes);

app.use("/", AI_featureRoutes);

app.use("/", productsRoutes);

app.use("/", serviceRoutes);

app.use("/", contactRoutes);

app.use("/", roMachineRoutes);

app.use("/", serviceHistoryRoutes);

app.use("/", technicianJobRoutes);


// LOCAL SERVER
if (require.main === module) {

    const port =
        process.env.PORT || 3000;

    app.listen(
        port,
        () => {

            console.log(
                `server running on http://localhost:${port}`
            );

        }
    );

}


// VERCEL EXPORT
module.exports = app;


// const port = 3000;
//server
// app.listen(port, () => {
//     console.log(`server running on http://localhost:${port}`);
// });


























