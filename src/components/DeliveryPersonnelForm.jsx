import React, { useState } from 'react';
import axios from 'axios';

const DeliveryPersonnelForm = () => {
  // Form state to capture input values
  const [patientName, setPatientName] = useState('');
  const [dietChartId, setDietChartId] = useState('');
  const [deliveryPersonnel, setDeliveryPersonnel] = useState({ name: '', contactInfo: '' });
  const [status, setStatus] = useState('Pending');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty required fields
    if (!patientName || !dietChartId || !deliveryPersonnel.name || !deliveryPersonnel.contactInfo) {
      setError('Please fill all the required fields.');
      return;
    }

    const deliveryData = {
      patientName,
      dietChartId,
      deliveryPersonnel,
      status,
      deliveryTime,
      notes,
    };

    try {
      const response = await axios.post(
        'https://hospital-food-management-system.onrender.com/api/v1/addDeleviry', // Ensure this is the correct endpoint
        deliveryData
      );
      console.log(response.data);
      // Handle success (e.g., redirect, show success message)
    } catch (error) {
      console.error('There was an error!', error);
      setError('There was an error while adding the delivery.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Add New Delivery</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto border border-gray-200"
      >
        {/* Patient Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="patientName">
            Patient Name
          </label>
          <input
            id="patientName"
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Diet Chart ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="dietChartId">
            Diet Chart ID
          </label>
          <input
            id="dietChartId"
            type="text"
            value={dietChartId}
            onChange={(e) => setDietChartId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Delivery Personnel */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Delivery Personnel</label>
          <input
            type="text"
            value={deliveryPersonnel.name}
            onChange={(e) => setDeliveryPersonnel({ ...deliveryPersonnel, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded mb-2"
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={deliveryPersonnel.contactInfo}
            onChange={(e) => setDeliveryPersonnel({ ...deliveryPersonnel, contactInfo: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Contact Info"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
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
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Delivery Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="deliveryTime">
            Delivery Time (Optional)
          </label>
          <input
            id="deliveryTime"
            type="datetime-local"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="notes">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mt-4"
        >
          Add Delivery Personnel
        </button>
      </form>
    </div>
  );
};

export default DeliveryPersonnelForm;
