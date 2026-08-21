require("dotenv").config();
    // path: "./OpenAi.env"

const express = require("express");
const path =  require("path");
const cors = require("cors");

const OpenAI = require("openai");

let client = null;
if (process.env.OPENAI_API_KEY &&
    !process.env.OPENAI_API_KEY.startsWith("Your_")) {

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    console.log("OpenAI confirgured successfully.");
} else {
    console.log("OpenAI API key not confirgured. AI feature is disabled.");
}

const mongoose = require("mongoose");
const connectDB =  require("./config/db");
connectDB();


const app = express();
const port = 3000;

app.use(cors());

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//static files
app.use(express.static(path.join(__dirname, "public")));

// form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const AI_featureRoutes = require("./routes/AI_featureRoutes");
const productsRoutes = require("./routes/productsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");


app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/", adminRoutes);
app.use("/", customerRoutes);
app.use("/", technicianRoutes);
app.use("/", AI_featureRoutes);
app.use("/", productsRoutes);
app.use("/", serviceRoutes);
app.use("/", contactRoutes);



// app.post("/api/chat", async(req, res) => {
//     try {
//         const { message } = req.body;

//         const completion = await client.chat.completions.create({
//             model: "gpt-4.1-mini",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are an expert AI assistent for Shanti Enterprises, an RO water purifier business. Answer only question related to RO purifiers, water purifiers, water filters, installation, AMC, repair, maintenance and customer support. Be friendly and professional."
//                 },

//                 {
//                     role: "user",
//                     content: message
//                 }
//             ]
//         });

//         res.json({
//             reply: completion.choices[0].message.content
//         });

//     } catch (err) {
//         console.error(err);

//         res.status(500).json({
//             reply: err.message
//         });
//     }
// });



//server
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});






