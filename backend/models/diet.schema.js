import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
  patientId: { type: Number, required: true },
  meals: {
    morning: { type: String, required: true },
    evening: { type: String, required: true },
    night: { type: String, required: true },
  },
  instructions: { type: String, required: true },
  ingredients: { type: [String], required: true },
});

export const Diet = mongoose.model("DietChart", dietChartSchema);
