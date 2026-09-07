const express = require("express");
const router = express.Router();

const adminTechnicianController = require(
    "../controllers/admin-technicianController"
);

const { requireRole } = require("../middleware/auth");


// view technicians
router.get(
    "/admin/technicians",
    requireRole("admin"),
    adminTechnicianController.getTechnicians
);

// show add technician form
router.get(
    "/admin/technicians/add",
    requireRole("admin"),
    adminTechnicianController.getAddTechnician
);

// create technician
router.post(
    "/admin/technicians/add",
    requireRole("admin"),
    adminTechnicianController.postAddTechnician
);

module.exports = router;