exports.getContact = (req, res) => {
    res.render("contact", {
        title: "Contact Us"
    });
};

exports.postContact = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            message
        } = req.body;

        console.log({
            name,
            email,
            phone,
            message
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};