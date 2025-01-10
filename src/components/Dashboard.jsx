import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import axios for making API requests
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // States to store fetched data
  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);

  // Fetch patients and pantry staff on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching patients data
        const patientResponse = await axios.get(
          "https://hospital-food-management-system.onrender.com/api/v1/all-patients"
        );
        setPatients(patientResponse.data.patients); // Set the fetched patients data

        // Fetching pantry staff data
        const pantryResponse = await axios.get(
          "https://hospital-food-management-system.onrender.com/api/v1/pantry-staffs"
        );
        setPantryStaff(pantryResponse.data.staff); // Set the fetched pantry staff data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this runs once on component mount

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
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
            <button
              onClick={handleAddPatientClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Patient
            </button>
          </div>

          {/* Add Pantry Staff Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold mb-4">Add Pantry Staff</h2>
            <button
              onClick={handleAddPantryClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Pantry Staff
            </button>
          </div>
        </div>

        {/* Displaying the Patients and Pantry Staff */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patients List */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
              <ul className="space-y-4">
                {patients.map((patient) => (
                  <li key={patient._id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact:</strong> {patient.contactInfo}</p>
                    <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
                    <p><strong>Room Number:</strong> {patient.roomNumber}</p>
                    <p><strong>Bed Number:</strong> {patient.bedNumber}</p>
                    <p><strong>Floor Number:</strong> {patient.floorNumber}</p>
                    <p><strong>Diseases:</strong> {patient.diseases.length > 0 ? patient.diseases.join(", ") : "None"}</p>
                    <p><strong>Allergies:</strong> {patient.allergies.length > 0 ? patient.allergies.join(", ") : "None"}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pantry Staff List */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Pantry Staff</h2>
              <ul className="space-y-4">
                {pantryStaff.map((staff) => (
                  <li key={staff._id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                    <p><strong>Name:</strong> {staff.name}</p>
                    <p><strong>Contact:</strong> {staff.contactInfo}</p>
                    <p><strong>Location:</strong> {staff.location}</p>
                    <p><strong>Assigned Tasks:</strong> {staff.assignedTasks.length > 0 ? 
                      staff.assignedTasks.map(task => (
                        <div key={task._id}>
                          <p><strong>Task:</strong> {task.taskType}</p>
                          <p><strong>Details:</strong> {task.taskDetails}</p>
                          <p><strong>Status:</strong> {task.status}</p>
                        </div>
                      )) : "None"
                    }</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
