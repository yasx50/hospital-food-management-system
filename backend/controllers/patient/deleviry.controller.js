import express from 'express';
import { Delivery } from '../../models/delivery.schema.js';

// Add new delivery
const addDelivery = async (req, res) => {
  try {
    // Destructure fields from req.body
    const { patientName, dietChartId, deliveryPersonnel, status, deliveryTime, notes } = req.body;

    // Validate required fields
    if (!patientName) {
      return res.status(400).json({ error: 'Patient Name is required' });
    }

    if (!dietChartId) {
      return res.status(400).json({ error: 'Diet Chart ID is required' });
    }

    if (!deliveryPersonnel || !deliveryPersonnel.name || !deliveryPersonnel.contactInfo) {
      return res.status(400).json({ error: 'Delivery Personnel information is incomplete' });
    }

    // Optional: Validate the `status` field if provided
    const validStatuses = ['Pending', 'Delivered'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    // Optional: Validate deliveryTime if provided (ensure it's a valid Date)
    if (deliveryTime && isNaN(new Date(deliveryTime).getTime())) {
      return res.status(400).json({ error: 'Invalid delivery time. Must be a valid date.' });
    }

    // Create a new Delivery document
    const newDelivery = new Delivery({
      patientName,
      dietChartId,
      deliveryPersonnel,
      status: status || 'Pending', // Default to 'Pending' if not provided
      deliveryTime, // Optional
      notes, // Optional
    });

    // Save the document to the database
    const savedDelivery = await newDelivery.save();

    // Respond with the saved document
    res.status(201).json({
      message: 'Delivery added successfully',
      delivery: savedDelivery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the delivery' });
  }
};

// Update the delivery status function
const updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId, status } = req.body;

    // Validate required fields
    if (!deliveryId) {
      return res.status(400).json({ error: 'Delivery ID is required' });
    }

    const validStatuses = ['Pending', 'Delivered'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    // Find and update the delivery status
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      { status },
      { new: true } // Return the updated document
    );

    // If no delivery found
    if (!updatedDelivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    // Respond with the updated delivery
    res.status(200).json({
      message: 'Delivery status updated successfully',
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the delivery status' });
  }
};

// Method to get all deliveries
const getAllDeliveries = async (req, res) => {
  try {
    // Retrieve all deliveries from the database
    const deliveries = await Delivery.find();

    // Respond with the retrieved deliveries
    res.status(200).json({
      message: 'Deliveries retrieved successfully',
      deliveries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the deliveries' });
  }
};

export {
  updateDeliveryStatus,
  addDelivery,
  getAllDeliveries
};
