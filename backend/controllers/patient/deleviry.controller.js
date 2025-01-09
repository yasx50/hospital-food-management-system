import express from 'express';
import { Delivery } from '../../models/delivery.schema.js';

const addDelivery = async (req, res) => {
  try {
    // Destructure fields from req.body
    const { patientId, dietChartId, deliveryPersonnelId, status, deliveryTime, notes } = req.body;

    // Validate required fields
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    if (!dietChartId) {
      return res.status(400).json({ error: 'Diet Chart ID is required' });
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
      patientId,
      dietChartId,
      deliveryPersonnelId, // Optional
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
  
  
  
export {
    updateDeliveryStatus,
    addDelivery
} 
