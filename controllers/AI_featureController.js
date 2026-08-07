const client = require("../config/openai");

exports.getAIPage = (req, res) => {
    res.render("AI_feature");
};

exports.chatwithAI = async (req, res) => {
    try {
        const {message} = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                reply: "Please enter a message."
            });
        }

        const completion =  await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
                    You are an AI assistnt for M/S Shanti Enterprises.
                    
                    You answer only questions related to:
                    • RO Water Purifiers
                    • Water Filters
                    • RO Installation
                    • Repair & Maintenance
                    • AMC Plans
                    • Filter Replacement
                    • Water Quality
                    • TDS
                    • RO Accessories
                    • Customer Support
                    Be polite, professional and give short, accurate answers.`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.status(200).json({
            success: true,
            reply: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("OpenAI Error:", error);

        res.status(500).json({
            success: false,
            reply: "Sorry, I'm unable to answer right now."
        });
    }
};