import React, { useState } from 'react';
import axios from 'axios'; // for making API calls

const DietForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    meals: [],
    instructions: '',
    ingredients: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Handle arrays (meals & ingredients) differently
    if (name === 'meals' || name === 'ingredients') {
      setFormData({ ...formData, [name]: value.split(',') });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://hospital-food-management-system.onrender.com/api/v1/diet',
        formData
      );
      console.log('Form submitted:', response.data);
      setFormData({
        patientId: '',
        meals: [],
        instructions: '',
        ingredients: [],
      }); // Clear form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm p-4 rounded">
      <h2 className="text-lg font-medium mb-4">Diet Information</h2>

      <div className="mb-4">
        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
          Patient ID
        </label>
        <input
          type="text"
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          className="shadow-sm p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="meals" className="block text-sm font-medium text-gray-700 mb-2">
          Meals (Comma separated)
        </label>
        <input
          type="text"
          id="meals"
          name="meals"
          value={formData.meals.join(', ')} // Display meals as comma-separated string
          onChange={handleChange}
          className="shadow-sm p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
          Instructions
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="shadow-sm p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full h-24"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients (Comma separated)
        </label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={formData.ingredients.join(', ')} // Display ingredients as comma-separated string
          onChange={handleChange}
          className="shadow-sm p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
          required
        />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default DietForm;