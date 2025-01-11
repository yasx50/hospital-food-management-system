import React, { useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Added patientId field
    name: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    diseases: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log formData for debugging
    console.log("Form data submitted:", formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`, // Ensure the URL is correct
        formData
      );
      console.log("Patient registered:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register Patient</h2>
      <form onSubmit={handleSubmit}>
        {/* Patient ID Field */}
        <div className="mb-4">
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-800">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-800">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-800">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Info Field */}
        <div className="mb-4">
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-800">
            Contact Info
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Emergency Contact Field */}
        <div className="mb-4">
          <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-800">
            Emergency Contact
          </label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Room Number Field */}
        <div className="mb-4">
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-800">
            Room Number
          </label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Bed Number Field */}
        <div className="mb-4">
          <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-800">
            Bed Number
          </label>
          <input
            type="text"
            id="bedNumber"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Floor Number Field */}
        <div className="mb-4">
          <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-800">
            Floor Number
          </label>
          <input
            type="number"
            id="floorNumber"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Diseases Field */}
        <div className="mb-4">
          <label htmlFor="diseases" className="block text-sm font-medium text-gray-800">
            Diseases
          </label>
          <input
            type="text"
            id="diseases"
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Allergies Field */}
        <div className="mb-4">
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-800">
            Allergies
          </label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
