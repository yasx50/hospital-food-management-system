import { Router } from "express";
import { registerPatient } from "../controllers/patient/patients-add.controller.js";
import {addDiet} from "../controllers/patient/diet-add.controller.js"
import { AddPantryStaff
        ,assignTaskToPantryStaff
        ,updateTaskStatus,
        getAllPantryStaff} from "../controllers/patient/pantry-staff.controller.js";
import {addDelivery,updateDeliveryStatus} from "../controllers/patient/deleviry.controller.js";

const router = Router()
router.route("/register").post(registerPatient)
router.route("/diet").post(addDiet)

//yaha se inner-pantry k routes hai
router.route("/addpantrystaff").post(AddPantryStaff)
router.route("/assigntaskinnerpantry").post(assignTaskToPantryStaff)
router.route("/updateTaskStatus").post(updateTaskStatus)
router.route("/pantry-staffs").get(getAllPantryStaff)

//yaha se deleviry k routes
router.route("/addDeleviry").post(addDelivery)
router.route("/updateDeliveryStatus").post(updateDeliveryStatus)

export default router