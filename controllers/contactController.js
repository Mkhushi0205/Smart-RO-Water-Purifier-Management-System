const ContactMessage = require("../models/contactMessage");

// display contact page
exports.getContact = (req, res) => {
    res.render("contact", {
        title: "Contact Us"
    });
};

// save contact message
exports.postContact = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            service,
            message
        } = req.body;

        // basic validation
        if(!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        // save message to mongo
        const newMessage = await ContactMessage.create({
            name,
            email,
            phone,
            service,
            message
        });

        console.log(
            "Contact message saved: ",
            newMessage._id
        );

        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {
        console.error(
            "Contact from error: ",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to send your message. Please try again later."
        });
    }
};