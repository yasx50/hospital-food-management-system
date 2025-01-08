import { Router } from "express";
import { registerPatient } from "../controllers/patient/patients-add.controller.js";

const router = Router()
router.route("/register").post(registerPatient)

export default router