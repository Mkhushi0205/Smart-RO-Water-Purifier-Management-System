const bcrypt = require("bcryptjs");
const User = require("../models/User");


// GET LOGIN PAGE

exports.getLogin = (req, res) => {
    res.render("login");
};


// LOGIN

exports.postLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).send(
                "Email and password are required."
            );
        }

        // Find user in MongoDB
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        // User not found
        if (!user) {
            return res.status(401).send(
                "Invalid email or password."
            );
        }

        // Compare entered password with stored hash
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).send(
                "Invalid email or password."
            );
        }

        console.log(
            `Login successful: ${user.email}`
        );

        // important: normalize role s admin/ADMIN/"admin", don't accidentlly become customer\
        const role = String(user.role || "")
            .trim()
            .toLowerCase();

        console.log("LOGIN EMAIL :", user.email);
        console.log("LOGIN ROLE :", JSON.stringify(role));
        console.log("LOGIN USER ID :", user._id.toString());

        // only allow know roles
        if (
            role !== "admin" &&
            role !== "technician" &&
            role !== "customer"
        ) {
            console.error(
                "INVALID USER ROLE :",
                user.email,
                JSON.stringify(user.role)
            );
            return res.status(403).send(
                "Your account has an invalid role. Please contact the administrator."
            );
        }


        // save user information in session
        req.session.userId = user._id.toStringify();
        req.session.role = role;

        // important for vercel
        // save the session completely BEFORE redirecting.
        req.session.save((err) => {
            if(err) {
                console.error("SESSION SAVE ERROR :", err);

                return res.status(500).send(
                    "Unable to create login session. Please try again."
                );
            }

            console.log(
                "SESSION SAVED :", 
                user.email,
                role
            );

            // role-based redirect
            if (role == "admin") {
                console.log("REDIRECTING ADMIN -> /admin-dashboard");
                return res.redirect("/admin-dashboard");
            }

            if (role === "technician") {
                console.log(
                    "REDIRECTING TECHNICIAN -> /technician-dashboard");
                    return res.redirect("/technician-dashboard");
            }

            console.log("REDIRECTING CUSTOMER -> /customer-dashboard");
            return res.redirect("/customer-dashboard");
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).send(
            "Internal Server Error"
        );
    }
};



//         //save logged-in user's ID in the session
//         req.session.userId = user._id.toString();

//         // password verification ke baad
//         console.log("LOGIN ROLE:", user.role);
//         console.log("LOGIN ROLE:", user.email);

//         // Redirect according to role
//         if (user.role === "admin") {
//             return res.redirect("/admin-dashboard");
//         }

//         if (user.role === "technician") {
//             return res.redirect("/technician-dashboard");
//         }

//         return res.redirect("/customer-dashboard");

//     } catch (err) {

//         console.error("Login Error:", err);

//         return res.status(500).send(
//             "Internal Server Error"
//         );
//     }
// };


// // GET REGISTER PAGE

// exports.getRegister = (req, res) => {
//     res.render("register");
// };


// // REGISTER

// exports.postRegister = async (req, res) => {
//     try {

//         const {
//             fullName,
//             email,
//             phone,
//             password,
//             confirmPassword
//         } = req.body;


//         // Check required fields

//         if (
//             !fullName ||
//             !email ||
//             !phone ||
//             !password ||
//             !confirmPassword
//         ) {
//             return res.status(400).send(
//                 "Please fill in all fields."
//             );
//         }


//         // Check password confirmation

//         if (password !== confirmPassword) {
//             return res.status(400).send(
//                 "Passwords do not match."
//             );
//         }


//         // Check password length

//         if (password.length < 8) {
//             return res.status(400).send(
//                 "Password must contain at least 8 characters."
//             );
//         }


//         // Check phone

//         if (!/^[0-9]{10}$/.test(phone)) {
//             return res.status(400).send(
//                 "Please enter a valid 10-digit phone number."
//             );
//         }


//         // Check existing email

//         const existingUser = await User.findOne({
//             email: email.trim().toLowerCase()
//         });

//         if (existingUser) {
//             return res.status(409).send(
//                 "An account with this email already exists."
//             );
//         }


//         // IMPORTANT:
//         // Do NOT hash the password here.
//         // User.js already has:
//         // userSchema.pre("save", ...)
//         // It will hash the password automatically.

//         const newUser = await User.create({

//             fullName: fullName.trim(),

//             email: email.trim().toLowerCase(),

//             phone: phone.trim(),

//             password: password,

//             role: "customer"
//         });


//         console.log(
//             "User registered successfully:",
//             newUser.email
//         );


//         // Redirect to login

//         return res.redirect("/login");

//     } catch (err) {

//         console.error("Register Error:", err);

//         // Duplicate email
//         if (err.code === 11000) {
//             return res.status(409).send(
//                 "This email is already registered."
//             );
//         }

//         return res.status(500).send(
//             "Internal Server Error"
//         );
//     }
// };


// // LOGOUT

// exports.logout = (req, res) => {

//     req.session.destroy((err) => {

//         if(err) {
            
//             console.error("Logout Error:", err);
//             return res.status(500).send("Unable to logout.");
//         }

//         res.clearCookie("connect.sid");
//         res.redirect("/"); 
//     });
// };