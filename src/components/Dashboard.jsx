import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle the button click to navigate to the Add Patient page
  const handleAddPatientClick = () => {
    navigate("/add-patient");
  };
  
  const handleAddPantryClick = () => {
    navigate("/add-PantryStaff");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900"> {/* Light theme background and text */}
      {/* Navbar */}
      <header className="bg-blue-600 p-4"> {/* Blue background for navbar */}
        <h1 className="text-3xl font-bold text-center text-white">Hospital Management</h1> {/* White text for contrast */}
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Patient Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
            <button
              onClick={handleAddPatientClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Patient
            </button>
          </div>

          {/* Add Pantry Staff Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Add Pantry Staff</h2>
            <button
              onClick={handleAddPantryClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Pantry Staff
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
