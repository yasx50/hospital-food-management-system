import express from 'express';
import { PantryStaff } from '../../models/pantry-staff.schema.js';

const AddPantryStaff = async (req, res) => {
  try {
    // Destructure fields from req.body
    const { name, contactInfo, location, taskType, taskDetails, dueBy } = req.body;

    // Validate input fields
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!contactInfo) {
      return res.status(400).json({ error: 'Contact information is required' });
    }

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    if (!taskType || !taskDetails) {
      return res.status(400).json({ error: 'Task type and task details are required' });
    }

    // Check if a staff member with the same contact info already exists (optional, avoids duplicates)
    const existingStaff = await PantryStaff.findOne({ contactInfo });
    if (existingStaff) {
      return res.status(409).json({ error: 'A staff member with this contact information already exists' });
    }

    // Create a new PantryStaff document, including the task
    const newStaff = new PantryStaff({
      name,
      contactInfo,
      location,
      assignedTasks: [
        {
          taskType,
          taskDetails,
          dueBy, // Optional: If present
        },
      ],
    });

    // Save the document to the database
    const savedStaff = await newStaff.save();

    // Respond with the saved document
    res.status(201).json({
      message: 'Pantry staff added and task assigned successfully',
      staff: savedStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the pantry staff' });
  }
};

// Function to update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { staffId, taskId, status } = req.body;

    // Validate required fields
    if (!staffId || !taskId || !status) {
      return res.status(400).json({ error: 'Staff ID, Task ID, and Status are required' });
    }

    // Validate status
    const validStatuses = ['Pending', 'Done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    // Find the pantry staff and the task to update
    const updatedStaff = await PantryStaff.findOneAndUpdate(
      { _id: staffId, 'assignedTasks._id': taskId }, // Find staff and the specific task
      {
        $set: {
          'assignedTasks.$.status': status,  // Update the task status
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedStaff) {
      return res.status(404).json({ error: 'Pantry staff or task not found' });
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      staff: updatedStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the task status' });
  }
};

// Function to get all pantry staff
const getAllPantryStaff = async (req, res) => {
  try {
    // Retrieve all pantry staff from the database
    const allStaff = await PantryStaff.find();

    if (!allStaff || allStaff.length === 0) {
      return res.status(404).json({ error: 'No pantry staff found' });
    }

    res.status(200).json({
      message: 'Pantry staff retrieved successfully',
      staff: allStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the pantry staff' });
  }
};

export {
  AddPantryStaff,
  updateTaskStatus,
  getAllPantryStaff
};
