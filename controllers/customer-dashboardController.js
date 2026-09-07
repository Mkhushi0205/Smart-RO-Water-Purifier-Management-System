const getCustomerDashboard = async (req, res) => {

        try {
        res.render("customer-dashboard", {
        user: req.user 
        });

    } catch (error) {

        console.error("Customer Dashboard Error:", error);

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to load Customer Dashboard."
        });
    }
};

module.exports = {
    getCustomerDashboard
};




