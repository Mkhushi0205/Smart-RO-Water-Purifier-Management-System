exports.getServices = async (req, res) => {
    try {
        res.render("services", {
            title: "Services"
        });
    } catch (err) {
        console.error("Service Error: ", err);
        res.status(500).send("Internal Server Error");
    }
};


//book services
exports.bookService = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};