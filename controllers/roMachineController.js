const RoMachine = require("../models/RoMachine");

// GET / my-machines
const getMyMachines = async (req, res) => {
    try {
        const machines = await RoMachine.find({
            customer: req.user._id
        }).sort({
            createdAt: -1
        });

        res.render("my-machines", {
            title: "My RO Machines",
            machines,
            user: req.user
        });

    } catch (error) {
        console.error(
            "Get My Machines Error: ", error
        );

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to load your RO machines."
        });
    }
};


// POST /my-machines/add
const addMachine = async (req, res) => {
    try {
        const {
            machineName,
            modelNumber,
            serialNumber,
            purchaseDate,
            installationDate,
            address,
            notes
        } = req.body;

        if (
            !machineName ||
            !serialNumber ||
            !address
        ) {
            return res.status(400).render("error", {
                title: "Invalid Request",
                message: "Machine name, serial number and address are required."
            });
        }

        await RoMachine.create({
            customer: req.user._id,

            machineName: 
                machineName.trim(),

            modelNumber: 
                modelNumber
                ? modelNumber.trim()
                : "",

            serialNumber:
                serialNumber
                    ? serialNumber.trim()
                    : "",
            
            purchaseDate: 
                purchaseDate || null,

            installationDate: 
                installationDate || null,

            address: 
                address.trim(),

            notes: 
                notes
                    ? notes.trim()
                    : ""
            
        });

        res.redirect("/my-machines");

    } catch (error) {
        console.error(
            "Add Machine Error: ",
            error
        );

        if (error.code === 11000) {
            return res.status(409).render("error", {
                title: "Duplicate Serial Number",
                message: "A machine with this serial number already exists."
            });
        }

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to add the RO machine."
        });
    }
};


// POST /my-machine/:id/update
const updateMachine = async (req, res) => {
    try {
        const {
            machineName,
            modelNumber,
            purchaseDate,
            installationDate,
            address,
            status,
            notes
        } = req.body;

        const machine = await RoMachine.findOneAndUpdate(
            {
                _id: req.params.id,
                customer: req.user._id
            },

            {
                machineName:
                    machineName
                        ? machineName.trim()
                        : undefined,
                
                modelNumber: 
                    modelNumber
                        ? modelNumber.trim()
                        : "",
                
                purchaseDate:
                    purchaseDate || null,

                installationDate:
                    installationDate || null,

                address:  
                    address
                        ? address.trim()
                        : undefined,
                    
                status,

                notes:
                    notes
                        ? notes.trim()
                        : ""
            },

            {
                new: true,
                runValidators: true
            }
        );

        if (!machine) {
            return res.status(404).render("error", {
                title: "Machine Not Found",
                message: "The requested RO machine was not found."
            });
        }

        res.redirect("/my-machines");

    } catch (error) {
        console.error("Update Machine Error: ", error);

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to update the RO machine."
        });
    }
};


// POST /my-machines/:id/delete
const deleteMachine = async (req, res) => {
    try {
        const machine = await RoMachine.findOneAndDelete({
            _id: req.params.id,
            customer: req.user._id
        });

        if (!machine) {
            return res.status(404).render("error", {
                title: "Machine Not Found",
                message: "The requested RO machine was not found."
            });
        }

        res.redirect("/my-machines");

    } catch (error) {
        console.error(
            "Delete Machine Error: ",
            error
        );

        res.status(500).render("error", {
            title: "Server Error",
            message: "Unable to delete the RO machine."
        });
    }
};

module.exports = {
    getMyMachines,
    addMachine,
    updateMachine,
    deleteMachine
};