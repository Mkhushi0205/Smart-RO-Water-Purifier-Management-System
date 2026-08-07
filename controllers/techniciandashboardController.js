exports.getTechnicianDashboard = async (req, res) => {
    try {
        res.render("technician-dashboard", {
            title: "Technician Dashboard",
            user: req.user || null
        });
    } catch (error) {
        console.error("Technician Dashboard Error: ", error);
        res.status(500).send("Internal Server Error");
    }
};

