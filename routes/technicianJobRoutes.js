const express = require("express");

const router = express.Router();

const technicianJobController = 
    require("../controllers/technicianJobController");

const {
    requireRole
} = require("../middleware/auth");

router.get(
    "/technician/jobs",
    requireRole("technician"),
    technicianJobController.getTechnicianJobs
);

router.post(
    "/technician/jobs/:id/status",
    requireRole("technician"),
    technicianJobController.updateJobStatus
);

module.exports = router;