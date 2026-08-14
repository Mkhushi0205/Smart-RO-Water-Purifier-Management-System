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
}


module.exports = client;
