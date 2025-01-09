import express from 'express';
import { Patient} from '../../models/patient.schema.js'

const registerPatient = async(req,res)=>{
    const {name,
            age,
            gender,
            contactInfo,
            emergencyContact,
            roomNumber,
            bedNumber,
            floorNumber
        } = req.body;

        if (
            [name, gender, contactInfo, emergencyContact, roomNumber, bedNumber].some((field) => field?.trim() === "") ||
            age === undefined || age === null || age === "" || isNaN(age) ||
            floorNumber === undefined || floorNumber === null || floorNumber === "" || isNaN(floorNumber)
        ) {
            return res.status(400).json({
                status:400,
                message:"provide all details of Patient"
            })
        }

        const existedPatient =await Patient.findOne({
           contactInfo
        })

        if(existedPatient) return res.status(400).json({
            status:400,
            message:"Patient already exists"
        })

        const patient = await Patient.create({
            name,
            age,
            gender,
            contactInfo,
            emergencyContact,
            roomNumber,
            bedNumber,
            floorNumber

        })

        const createdPatient = await Patient.findById(patient._id)

        if(!createdPatient) {
            return res.status(500).json({
                message:"something went wrong while registernig the patient"
            })
        }

        return res.status(200).json({
            status:200,
            message:"patient register successfully"
        })
}
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        if (!patients.length) {
            return res.status(404).json({
                status: 404,
                message: "No patients found"
            });
        }
        return res.status(200).json({
            status: 200,
            patients
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error retrieving patients",
            error: error.message
        });
    }
};

export { registerPatient, getAllPatients };