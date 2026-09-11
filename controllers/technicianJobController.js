const ServiceBooking = require("../models/serviceBooking");

exports.getTechnicianJobs = async (req, res) => {
    try {
        const jobs = await ServiceBooking.find({
            technician: req.user._id
        })

        .populate(
            "customer",
            "fullName email phone"
        )

        .sort({
            preferredDate: 1
        });

        res.render("technician-jobs", {
            title: "My Technician Jobs",
            jobs,
            user: req.user
        });

    } catch (error) {
        console.error(
            "Technician Jobs Error:",
            error
        );

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to load technician jobs."
        });
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const {
            status, notes
        } = req.body;

        const allowedStatuses = [
            "Assigned",
            "In Progress",
            "Completed"
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).render(
                "error",
                {
                    title: "Invalid Status",
                    message: "Invalid service status."
                }
            );
        }

        const job = await ServiceBooking.findOneAndUpdate(
            {
                _id: req.params.id,
                technician: req.user._id
            },

            {
                status, notes: notes
                    ? notes.trim()
                    : ""
            },

            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).render(
                "error",
                {
                    title: "Job Not Found",
                    message: "This job does not exist or is not assigned to you."
                }
            );
        }

        res.redirect("/technician/jobs");
    } catch (error) {
        console.error(

            "Update Technician Job Error:",
            error
        );

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to update the service job."
        });
    }
};