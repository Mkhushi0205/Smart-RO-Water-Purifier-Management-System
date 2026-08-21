require("dotenv").config();

const OpenAI = require("openai");

let client = null;

if (
    process.env.OPENAI_API_KEY &&
    !process.env.OPENAI_API_KEY.startsWith("YOUR_")
) {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });  

    console.log("OpenAI configured successfully.");
} else {
    console.log("OpenAI API key not configured. AI feature is disabled.");
}

module.exports = client;