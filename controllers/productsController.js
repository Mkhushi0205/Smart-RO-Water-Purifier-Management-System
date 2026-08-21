const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.render("products", {
            title: "Products",
            products
        });
    } catch (err) {
        console.error("Products Error: ", err);
        res.status(500).send("Internal Server Error");
    }
};