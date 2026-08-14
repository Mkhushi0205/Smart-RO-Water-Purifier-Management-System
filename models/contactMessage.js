const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
    {
        // person's name
        name: {
            type: String,
            required: true,
            trim: true
        },

        // email address
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        // phone number
        phone: {
            type: String,
            required: true,
            trim: true
        },

        // service the customer is interested in
        service: {
            type: String,
            trim: true,
            default: ""
        },

        // customer's message
        message: {
            type: String,
            required: true,
            trim: true
        },

        // status of the message
        status: {
            type: String,
            enum: [
                    "New",
                    "Read",
                    "Replied",
                    "Closed"
                ],
                default: "New"
        },
        
        // admin reply
        reply: {
            type: String,
            trim: true,
            default: ""
        }
    },

    {
        timestamps: true
    }
);

const ContactMessage = mongoose.model(
    "ContactMessage",
    contactMessageSchema
);

module.exports = ContactMessage;