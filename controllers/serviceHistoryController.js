const ServiceBooking = require("../models/serviceBooking");

exports.getServiceHistory = async (req, res) => {
    try {

        if (!req.user) {
            return res.redirect("/login");
        }

        const bookings = 
            await ServiceBooking.find({
                customer: req.user._id
            })
            .populate(
                "technician",
                "fullName phone email"
            )
            .sort({
                createdAt: -1
            });

            console.log(
                "Service History:", 
                bookings.length, 
                "bookings found for", 
                req.user.email);

            res.render("service-history", {
                title: "Service History",
                bookings,
                user: req.user
            });

        } catch (error) {

            console.error(
                "Service History Error: ",
                error
            );

            res.status(500).render("error", {
                title: "Server Error",
                message: "Unable to load service history."
            })
        }
    };
    
