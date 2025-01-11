import { Router } from "express";
import { registerPatient ,getAllPatients} from "../controllers/patient/patients-add.controller.js";
import {addDiet,getAllDiets} from "../controllers/patient/diet-add.controller.js"
import { AddPantryStaff
        ,updateTaskStatus,
        getAllPantryStaff} from "../controllers/patient/pantry-staff.controller.js";
import {addDelivery,updateDeliveryStatus,getAllDeliveries} from "../controllers/patient/deleviry.controller.js";

import {registerAdmin,loginAdmin} from "../controllers/patient/admin.controller.js"

const router = Router()
//ye route patients se related hai
router.route("/register").post(registerPatient)
router.route("/all-patients").get(getAllPatients)

//add diet 
router.route("/diet").post(addDiet)
router.route("/all-diet").get(getAllDiets)

//yaha se inner-pantry k routes hai
router.route("/addpantrystaff").post(AddPantryStaff)
// router.route("/assigntaskinnerpantry").post(assignTaskToPantryStaff)
router.route("/updateTaskStatus").post(updateTaskStatus)
router.route("/pantry-staffs").get(getAllPantryStaff)

//yaha se deleviry k routes
router.route("/addDeleviry").post(addDelivery)
router.route("/updateDeliveryStatus").post(updateDeliveryStatus)
router.route("/all-deleviry").get(getAllDeliveries)

// yaha pr admin ka route
router.route("/register-admin").post(registerAdmin)
router.route("/login-admin").post(loginAdmin)
export default router