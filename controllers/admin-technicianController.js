const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Get: show all technicians
exports.getTechnicians = async (req, res) => {
    
    try {

        const technicians = await User.find({
            role: "technician"
        })
        .select("-password")
        .sort({ createdAt: -1 });

        res.render("admin-technicians", {
            title: "Manage Technicians",
            technicians
        }); 
    } catch (error) {
        console.error("Get Technicians Error:", error);

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to load technicians."
        });
    }
}


// Get: add technician form
exports.getAddTechnician = (req, res) => {
    res.render("add-technician", {
        title: "Add Technician"
    });
};


// Post: create technician
exports.postAddTechnician = async (req, res) => {

    try {

        const {
            fullName,
            email,
            phone,
            password,
            confirmPassword
        } = req.body;

        // check required fields
        if (
            !fullName ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).send(
                "Please fill in all fields."
            );
        }

        // check password
        if (password !== confirmPassword) {
            return res.status(400).send(
                "Password do not match."
            );
        }

        // check password length
        if (password.length < 8) {
            return res.status(400).send(
                "Password must contain at least 8 characters."
            );
        }

        // check phone
        if (!/^[0-9]{10}$/.test(phone.trim())) {
            return res.status(400).send(
                "Please enter a valid 10-digit phone number."
            );
        }

        // check existing email
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(409).send(
                "An account with this email already exists."
            );
        }


        // create technician
        // IMPORTANT:
        // The role is decided by the server.
        // Admin cannot accidentally create a customer/admin here.
        const technician = await User.create({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password: password,
            role: "technician"
        });

        console.log("Technician created:", technician.email);

        return res.redirect("/admin/technicians");

    } catch(error) {
        console.error("Add Technician Error:", error);

        if(error.code === 11000) {
            return res.status(409).send(
                "This email is already registered."
            );
        }

        return res.status(500).send(
            "Unable to create technician."
        );
    }
};

