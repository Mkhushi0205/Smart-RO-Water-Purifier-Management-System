require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");


const fixUserRoles = async () => {

    try {

        await connectDB();

        console.log(
            "Connected to MongoDB."
        );


        // FIX ADMIN
        const adminResult =
            await User.updateOne(
                {
                    email:
                        "admin@shantienterprises.com"
                },
                {
                    $set: {
                        role: "admin"
                    }
                }
            );


        console.log(
            "Admin role update:",
            adminResult.modifiedCount
        );


        // FIX TECHNICIAN
        const technicianResult =
            await User.updateOne(
                {
                    email:
                        "technician@shantienterprises.com"
                },
                {
                    $set: {
                        role: "technician"
                    }
                }
            );


        console.log(
            "Technician role update:",
            technicianResult.modifiedCount
        );


        // FIX CUSTOMER
        const customerResult =
            await User.updateOne(
                {
                    email:
                        "customer@shantienterprises.com"
                },
                {
                    $set: {
                        role: "customer"
                    }
                }
            );


        console.log(
            "Customer role update:",
            customerResult.modifiedCount
        );


        // VERIFY USERS
        const users =
            await User.find(
                {
                    email: {
                        $in: [
                            "admin@shantienterprises.com",
                            "technician@shantienterprises.com",
                            "customer@shantienterprises.com"
                        ]
                    }
                }
            ).select(
                "fullName email role"
            );


        console.log(
            "\nFINAL USER ROLES:"
        );

        users.forEach((user) => {

            console.log(
                `${user.email} -> ${user.role}`
            );

        });


        console.log(
            "\nUser roles fixed successfully."
        );


        process.exit(0);


    } catch (error) {

        console.error(
            "Role fixing failed:"
        );

        console.error(
            error.message
        );

        process.exit(1);

    }

};


fixUserRoles();