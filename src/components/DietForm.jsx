import React, { useState } from "react";
import axios from "axios";

const DietForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    meals: {
      morning: "",
      evening: "",
      night: "",
    },
    instructions: "",
    ingredients: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["morning", "evening", "night"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        meals: { ...prev.meals, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/diet`,
        formattedData
      );
      console.log("Diet submitted successfully:", response.data);
      alert("Diet plan submitted successfully!");
      setFormData({
        patientId: "",
        meals: { morning: "", evening: "", night: "" },
        instructions: "",
        ingredients: "",
      });
    } catch (error) {
      console.error("Error submitting diet plan:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to submit diet plan.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-10 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Add Diet Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient ID */}
          <div>
            <label
              htmlFor="patientId"
              className="block text-sm font-semibold text-gray-600"
            >
              Patient ID
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter Patient ID"
              required
            />
          </div>

          {/* Meal Timings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Meals</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {["morning", "evening", "night"].map((meal) => (
                <div key={meal}>
                  <label
                    htmlFor={meal}
                    className="block text-sm font-medium text-gray-600"
                  >
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={meal}
                    name={meal}
                    value={formData.meals[meal]}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder={`Enter ${meal} meal details`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-semibold text-gray-600"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              rows="4"
              placeholder="Enter instructions for the diet"
              required
            ></textarea>
          </div>

          {/* Ingredients */}
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-semibold text-gray-600"
            >
              Ingredients (comma-separated)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              rows="4"
              placeholder="Enter ingredients separated by commas"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition duration-200"
            >
              Submit Diet Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietForm;
