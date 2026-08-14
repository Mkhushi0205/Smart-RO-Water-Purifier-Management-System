const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema(
    {
        // customer information
        customerName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        // service information
        serviceType: {
            type: String,
            required: true,
            trim: true
        },

        problemDescription: {
            type: String,
            required: true,
            trim: true
        },

        // customer address
        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            trim: true
        },

        pincode: {
            type: String,
            trim: true,
            default: ""
        },

        // preferred service date
        preferredDate: {
            type: Date,
            required: true
        },

        // booking status
        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Assigned",
                "In Progress",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        },

        // technician assigned to the booking
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        // additional notes
        notes: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const ServiceBooking = mongoose.model(
    "ServiceBooking",
    serviceBookingSchema
);

module.exports = ServiceBooking;