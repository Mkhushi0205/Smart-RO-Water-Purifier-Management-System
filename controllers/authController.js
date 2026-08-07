const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.postLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash("Password123", 10);

        const isMatch = await bcrypt.compare(
            password, hashedPassword
        );

        if (!isMatch) {
            return res.send("Invalid Password");
        }

        console.log("Login Successfully");

        res.redirect("/");
    } catch (err) {

        console.error("Login Error : ", err);
        res.status(500).send("Invalid Server Error");
    }    
};




exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postRegister = async (req, res) => {

    try {
    
        const {
            fullName,
            email,
            phone,
            password,
            confirmPassword
        } = req.body;

    if (password !== confirmPassword) {
        return res.send("Passwords do not match");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Name: ", fullName);
        console.log("Email: ", email);
        console.log("Phone: ", phone);
        console.log("Hashed Password: ", hashedPassword);

        res.redirect("/login");
    } catch (err) {
        console.error("Register Error : ", err);
        res.status(500).send("Internal Server Error");
    }
};


exports.logout = (req, res) => {
    res.redirect("/");
};

























