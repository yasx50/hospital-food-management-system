import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);


  const handleAddPatientClick = () => {
    navigate("/add-patient");
  };

  const handleAddPantryClick = () => {
    navigate("/add-PantryStaff");
  };

  const handleAddDElClick = () => {
    navigate("/add-addDeleviry");
  };

  const handleAddDietClick = () => {
    navigate("/add-diet");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 p-4">
        <h1 className="text-3xl font-bold text-center text-white">
          Hospital Management (ADMIN DASHBOARD)
        </h1>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
            <button
              onClick={handleAddPatientClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Patient
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-4">Add Pantry Staff</h2>
            <button
              onClick={handleAddPantryClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Pantry Staff
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-4">Add Delivery Personnel</h2>
            <button
              onClick={handleAddDElClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Add Delivery Personnel
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-4">
              Specify the Diet To Patients
            </h2>
            <button
              onClick={handleAddDietClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Add Diet
            </button>
          </div>
        </div>

        <div className="mt-8">
         
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
