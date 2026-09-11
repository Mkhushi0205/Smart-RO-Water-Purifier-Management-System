require("dotenv").config();
    // path: "./OpenAi.env"


const express = require("express");
const app = express();

const path =  require("path");
const cors = require("cors");
const session =  require("express-session");
const mongoose = require("mongoose");

const { loadUser, requireRole } = require("./middleware/auth");

const connectDB =  require("./config/db");
connectDB();

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

    console.log("OpenAI confirgured successfully.");
} else {
    console.log("OpenAI API key not confirgured. AI feature is disabled.");
}


const port = 3000;


app.use(cors());


// basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "smart-ro-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// load logged-in user
app.use(loadUser);


//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//static files
app.use(express.static(path.join(__dirname, "public")));


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


//server
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});


























