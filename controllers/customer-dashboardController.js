exports.getDashboard = async (req, res) => {
    try {
        res.render("customer-dashboard", {
            title: "CustomerDashboard",
            user: req.user || null
        });
    } catch (error) {
        console.log("customerDashboard Error: ", error);
        res.status(500).send("Internal server Error");
    }
};