import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactInfo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  roomNumber: { type: String, required: true },
  bedNumber: { type: String, required: true },
  floorNumber: { type: Number, required: true },
  diseases: [String],
  allergies: [String],
});

export const Patient = mongoose.model('Patient', patientSchema);
