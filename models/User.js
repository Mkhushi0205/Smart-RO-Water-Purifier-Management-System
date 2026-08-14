const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["customer", "admin", "technician"],
            default: "customer"
        }
    },

    {
        timestamps: true
    }
);

// hash password before saving
userSchema.pre("save", async function() {

    // if password has not changed, don't hash it again
    if (!this.isModified("password")) {
        return;
    }
    
    const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(
            this.password,
            salt
        );
    }
);

// compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

const User = mongoose.model("User", userSchema);

module.exports = User;