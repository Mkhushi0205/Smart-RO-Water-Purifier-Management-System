exports.getProducts = async (req, res) => {
    try {
        res.render("products", {
            title: "Products"
        });
    } catch (err) {
        console.error("Products Error: ", err);
        res.status(500).send("Internal Server Error");
    }
};