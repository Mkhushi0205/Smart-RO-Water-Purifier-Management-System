const express = require("express");
const router = express.Router();

const roMachineController = 
    require("../controllers/roMachineController");

const { requireRole } = 
    require("../middleware/auth");

router.get(
    "/my-machines", 
    requireRole("customer"), 
    roMachineController.getMyMachines
);

router.post(
    "/my-machines/add", 
    requireRole("customer"), 
    roMachineController.addMachine
);

router.post(
    "/my-machines/:id/update", 
    requireRole("customer"), 
    roMachineController.updateMachine
);

router.post(
    "/my-machines/:id/delete", 
    requireRole("customer"), 
    roMachineController.deleteMachine
);

module.exports = router;