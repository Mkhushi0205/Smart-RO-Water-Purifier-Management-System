require("dotenv").config();
    // path: "./OpenAi.env"

const express = require("express");
const app = express();

const path =  require("path");
const cors = require("cors");
const session =  require("express-session");
const MongoStore = require("connect-mongo");

app.set("trust proxy", 1);

const mongoose = require("mongoose");

const { loadUser, requireRole } = require("./middleware/auth");
const connectDB =  require("./config/db");


//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//static files
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
// basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db before any route that needs it, but fail with a clear message instead of crashing the whole app
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB connection error:", err.message);
        res.status(500).send("Database connection failed. Please try again shortly.");
    }
});


// session store - wrapped so a bad mongo uri doesn't crash app startup
let sessionStore;
try {
    sessionStore = MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        ttl: 60 * 60 * 24
    });
} catch (err) {
    console.error("Session store init failed, falling back to memoryStore:", err.message);
    sessionStore = undefined;
}

app.use(session({
    secret: process.env.SESSION_SECRET || "smart-ro-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24
    }
}));


// routes
const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");

const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const adminTechnicianRoutes = require(
    "./routes/adminTechnicianRoutes"
);

const AI_featureRoutes = require("./routes/AI_featureRoutes");
const productsRoutes = require("./routes/productsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");

const roMachineRoutes = require("./routes/roMachineRoutes");
const serviceHistoryRoutes = require("./routes/serviceHistoryRoutes");
const technicianJobRoutes = require("./routes/technicianJobRoutes")

const OpenAI = require("openai");

let client = null;
if (process.env.OPENAI_API_KEY &&
    !process.env.OPENAI_API_KEY.startsWith("Your_")) {

    client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    console.log("OpenAI configured successfully.");
} else {
    console.log("OpenAI API key not configured. AI feature is disabled.");
}

// load logged-in user
app.use(loadUser);


// routes
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


if (require.main === module) {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
    });
}

module.exports = app;



// const port = 3000;
//server
// app.listen(port, () => {
//     console.log(`server running on http://localhost:${port}`);
// });


























