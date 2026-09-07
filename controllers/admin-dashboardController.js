exports.getAdminDashboard = async (req, res) => {

    // res.render("admin-dashboard", {
    //     adminName: "Ravindra",
    //     totalCustomers: 250
    // });

    try {
        const dashboardData = {
            adminName: req.user.fullName,
            
            statistics: {
                totalCustomers: 245,
                totalProducts: 38,
                totalTechnicians: 12,
                totalBookings: 156,
                pendingServices: 19,
                completedServices: 137,
                activeAMC: 81,
                revenue: 452300
            },

            recentBookings: [
                {
                    id: "BK101",
                    customer: "Rahul Sharma",
                    phone: "9876543210",
                    service: "Repaire",
                    date: "23 jul 2026",
                    status: "Pending"
                },

                {
                    id: "BK102",
                    customer: "Priya Singh",
                    phone: "9123456780",
                    service: "AMC",
                    date: "24 jul 2026",
                    status: "Assigned"
                },

                {
                    id: "BK103",
                    customer: "Aman Sharma",
                    phone: "9988776655",
                    service: "Installation",
                    date: "25 jul 2026",
                    status: "Completed"
                }
            ],

            notifications: [
                "3 new service bookings",
                "2 AMC plans expairing today",
                "1 technician marked service completed"
            ]
        };

        res.render("admin-dashboard", dashboardData);
    } catch (error) {
        console.log(error);

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to load Admin Dashboard."
        });
    }
};