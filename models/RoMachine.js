const mongoose = require("mongoose");

const roMachineSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        machineName: {
            type: String,
            required: true,
            trim: true
        },

        modelNumber: {
            type: String,
            trim: true,
            default: ""
        },

        serialNumber: {
            type: String,
            rquired: true,
            trim: true,
            unique: true
        },

        purcheseDate: {
            type: Date,
            default: null
        },

        installationDate: {
            type: Date,
            default: null
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Need Service",
                "Inactive"
            ],
            default: "Active"
        },

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

module.exports = mongoose.model(
    "RoMachine",
    roMachineSchema
);