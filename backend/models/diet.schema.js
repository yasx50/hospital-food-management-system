import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  meals: {
    morning: { type: String, required: true },
    evening: { type: String, required: true },
    night: { type: String, required: true },
  },
  instructions: { type: String },
  ingredients: [String],
});

export const Diet = mongoose.model('DietChart', dietChartSchema);
