import express from 'express';
import {Diet} from '../../models/diet.schema.js'

const addDiet = async (req, res) => {
  try {
    // Destructure necessary fields from req.body
    const { patientId, meals, instructions, ingredients } = req.body;

    // Validate input fields
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    if (!meals || !meals.morning || !meals.evening || !meals.night) {
      return res.status(400).json({ error: 'All meals (morning, evening, night) are required' });
    }

    // Optional: Validate ingredients array if provided
    if (ingredients && !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients must be an array' });
    }

    // Create a new Diet document
    const newDiet = new Diet({
      patientId,
      meals,
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

export {
    addDiet

} ;
