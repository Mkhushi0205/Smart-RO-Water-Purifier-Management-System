const ServiceBooking = require("../models/serviceBooking");

// get Services page
exports.getServices = async (req, res) => {
    try {
        res.render("services", {
            title: "Services"
        });
    } catch (err) {
        console.error("Service Error: ", err);

        res.status(500).send("Internal Server Error");
    }
};


//book services
exports.bookService = async (req, res) => {
    try {
        const {
            customerName,
            email,
            phone,
            serviceType,
            problemDescription,
            address,
            city,
            pincode,
            preferredDate,
            notes 
        } = req.body;

        // required field validation
        if(
            !customerName ||
            !email ||
            !phone ||
            !serviceType ||
            !problemDescription ||
            !address ||
            !preferredDate
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        // phone validaton
        if(!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit phone number."
            });
        }

        // create booking
        const booking = await ServiceBooking.create({
            customerName: customer.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            serviceType: serviceType.trim(),
            problemDescription: problemDescription.trim(),
            address: address.trim(),

            city: city
                ? city.trim()
                : "",

            pincode: pincode
                ? pincode.trim()
                : "",

            preferredDate: new Date(preferredDate),

            notes: notes
                ? notes.trim()
                : ""
        });

        console.log(
            "Service booking created: ",
            booking._id
        );

        // success response
        return res.status(201).json({
            success: true,
            message: "Service booked successfully!",
            bookingId: booking._id
        });
    } catch(err) {
        console.error(
            "Service Booking Error: ",
            err
        );

        return res.status(500).json({
            success: false,
            message: "Unable to book the service. Please try again."
        });
    }
};