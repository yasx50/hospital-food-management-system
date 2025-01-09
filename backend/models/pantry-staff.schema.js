import mongoose from "mongoose";

const pantryStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true },
  assignedTasks: [
    {
      taskType: { type: String, enum: ['Food Preparation'], required: true }, // Restricted to 'Food Preparation'
      taskDetails: { type: String, required: true }, // Additional details about the food preparation task
      assignedAt: { type: Date, default: Date.now }, // Time of assignment
      dueBy: { type: Date }, // Optional: Due date for the task
      status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' }, // Task status
    },
  ], // Array to track assigned tasks
});

export const PantryStaff = mongoose.model('PantryStaff', pantryStaffSchema);
