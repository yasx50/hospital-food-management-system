import React, { useState } from "react";
import axios from "axios";

const PantryStaffForm = () => {
  // Form state to capture input values
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [taskType, setTaskType] = useState("Food Preparation"); // Default taskType to 'Food Preparation'
  const [taskDetails, setTaskDetails] = useState("");
  const [dueBy, setDueBy] = useState("");
  const [status, setStatus] = useState("Pending");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const pantryStaffData = {
      name,
      contactInfo,
      location,
      assignedTasks: [
        {
          taskType,
          taskDetails,
          dueBy,
          status,
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://hospital-food-management-system.onrender.com/api/v1/addpantrystaff",
        pantryStaffData
      );
      console.log(response.data); // Log the response from the server
      // You can also redirect to another page or show success message here
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Add Pantry Staff</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto border border-gray-200"
      >
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Contact Info Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="contactInfo">
            Contact Info
          </label>
          <input
            id="contactInfo"
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Task Type Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="taskType">
            Task Type
          </label>
          <select
            id="taskType"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          >
            <option value="Food Preparation">Food Preparation</option>
          </select>
        </div>

        {/* Task Details Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="taskDetails">
            Task Details
          </label>
          <textarea
            id="taskDetails"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Due By Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="dueBy">
            Due By (Optional)
          </label>
          <input
            id="dueBy"
            type="date"
            value={dueBy}
            onChange={(e) => setDueBy(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Status Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          Add Pantry Staff
        </button>
      </form>
    </div>
  );
};

export default PantryStaffForm;
