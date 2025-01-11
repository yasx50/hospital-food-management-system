import express from 'express';
import { Patient } from '../../models/patient.schema.js';

const registerPatient = async (req, res) => {
    const { 
        patientId,  // Accepting patientId from the request body
        name,
        age,
        gender,
        contactInfo,
        emergencyContact,
        roomNumber,
        bedNumber,
        floorNumber,
        diseases,
        allergies 
    } = req.body;

    // Validate required fields
    if (
        [patientId,name, gender, contactInfo, emergencyContact, roomNumber, bedNumber].some((field) => field?.trim() === "") ||
        age === undefined || age === null || age === "" || isNaN(age) ||
        floorNumber === undefined || floorNumber === null || floorNumber === "" || isNaN(floorNumber)
    ) {
        return res.status(400).json({
            status: 400,
            message: "Provide all required details of the patient"
        });
    }

    // Check if patient already exists based on contact info
    const existedPatient = await Patient.findOne({ contactInfo });
    if (existedPatient) {
        return res.status(400).json({
            status: 400,
            message: "Patient already exists"
        });
    }

    // Create new patient
    const patient = await Patient.create({
        patientId,  // Save patientId in the database
        name,
        age,
        gender,
        contactInfo,
        emergencyContact,
        roomNumber,
        bedNumber,
        floorNumber,
        diseases: diseases || [], // Default to empty array if not provided
        allergies: allergies || [] // Default to empty array if not provided
    });

    // Verify patient creation
    const createdPatient = await Patient.findById(patient._id);
    if (!createdPatient) {
        return res.status(500).json({
            message: "Something went wrong while registering the patient"
        });
    }

    return res.status(200).json({
        status: 200,
        message: "Patient registered successfully",
        patient: createdPatient
    });
};

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

export {
    registerPatient,
    getAllPatients
};
