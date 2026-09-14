const Product = require("../models/Product");
const connectDB = require("../config/db");

exports.getProducts = async (req, res) => {
    try {
        await connectDB();
        
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