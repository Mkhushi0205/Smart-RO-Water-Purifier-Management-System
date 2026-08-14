require("dotenv").config();

const connectDB = require("../config/db");

const User = require("../models/User");
const Product = require("../models/Product");

const seedDatabase = async() => {
    try {
        //connect to mongodb
        await connectDB();

        console.log("Starting database seeding...");

        // clear old demo users and products
        await User.deleteMany({});
        await Product.deleteMany({});

        console.log("Old demo data removed.");

        // create demo users
        const users = [
            {
                fullName: "Admin User",
                email: "admin@shantienterprises.com",
                phone: "9876543210",
                password: "Password123",
                role: "admin"
            },

            {
                fullName: "Raj Kumar",
                email: "technician@shantienterprises.com",
                phone: "9876543211",
                password: "Password123",
                role: "technician"
            },

            {
                fullName: "Customer User",
                email: "customer@shantienterprises.com",
                phone: "9876543212",
                password: "Password123",
                role: "customer"
            }
        ];

        await User.create(users);

        console.log("Demo users created.");


        // create demo products
        const products = [
            {
                name: "RO Water Purifier",
                description: "Advanced RO water purifier for clean and safe drinking water.",
                price: 12999,
                category: "RO Purifer",
                stock: 10
            },

            {
                name: "UV Water Purifier",
                description: "UV water purification system for homes and offices.",
                price: 9999,
                category: "UV Purifer",
                stock: 15
            },

            {
                name: "RO + UV Water Purifier",
                description: "RO and UV purification system with advanced filtration.",
                price: 15999,
                category: "RO + UV",
                stock: 8

            }
        ];

        await Product.create(products);

        console.log("Demo products created.");

        console.log("-----------------------------------");
        console.log("Database seeding completed!");
        console.log("-----------------------------------");

        console.log("\nDemo Login Details:");
        console.log("Admin:");
        console.log("Email: admin@shantiEnterprises.com");
        console.log("Password: Password123");

        console.log("\nTechnician:");
        console.log("Email: technician@shantiEnterprises.com");
        console.log("Password: Password123");

        console.log("\nDemo Login Details:");
        console.log("Email: customer@shantiEnterprises.com");
        console.log("Password: Password123");

        process.exit(0);

    } catch (error) {
        console.error("Database seeding failed!");
        console.error(error.message);

        process.exit(1);
    }
};

seedDatabase();