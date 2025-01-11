import mongoose from "mongoose";
import express from 'express';
import { Diet } from '../../models/diet.schema.js'; // Assuming the path is correct

// Method to add a new diet chart
const addDiet = async (req, res) => {
  try {
    // Destructure necessary fields from req.body
    const { patientId, meals: { morning, evening, night }, instructions, ingredients } = req.body;

    // Validate input fields
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    if (!morning || !evening || !night) {
      return res.status(400).json({ error: 'All meal times (morning, evening, night) are required' });
    }

    // Optional: Validate ingredients array if provided
    if (ingredients && !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients must be an array of strings' });
    }

    // Create new Diet document with nested meals structure
    const newDiet = new Diet({
      patientId,
      meals: {
        morning,
        evening,
        night,
      },
      instructions,
      ingredients,
    });

    // Save the document to the database
    const savedDiet = await newDiet.save();

    // Respond with the saved document
    res.status(201).json({
      message: 'Diet chart added successfully',
      diet: savedDiet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the diet chart' });
  }
};

// Method to get all diet charts
const getAllDiets = async (req, res) => {
  try {
    // Retrieve all diets from the database
    const diets = await Diet.find();

    // Respond with the retrieved diets
    res.status(200).json({
      message: 'Diet charts retrieved successfully',
      diets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the diet charts' });
  }
};

export {
  addDiet,
  getAllDiets
};
