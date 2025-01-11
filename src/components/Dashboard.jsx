import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching patients data
        const patientResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-patients`
        );
        setPatients(patientResponse.data.patients);

        // Fetching pantry staff data
        const pantryResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pantry-staffs`
        );
        setPantryStaff(pantryResponse.data.staff);

        // Fetching delivery personnel data
        const deliveryResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/delivery-personnel`
        );
        setDeliveryPersonnel(deliveryResponse.data.personnel);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          Hospital Management
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
              <ul className="space-y-4">
                {patients.map((patient) => (
                  <li
                    key={patient._id}
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
                  >
                    <p><strong>Patient ID:</strong> {patient.patientId}</p> {/* Added Patient ID */}
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

            <div>
              <h2 className="text-2xl font-semibold mb-4">All Pantry Staff</h2>
              <ul className="space-y-4">
                {pantryStaff.map((staff) => (
                  <li
                    key={staff._id}
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
                  >
                    <p><strong>Name:</strong> {staff.name}</p>
                    <p><strong>Contact:</strong> {staff.contactInfo}</p>
                    <p><strong>Location:</strong> {staff.location}</p>
                    <p>
                      <strong>Assigned Tasks:</strong>{" "}
                      {staff.assignedTasks.length > 0
                        ? staff.assignedTasks.map((task) => (
                            <div key={task._id}>
                              <p><strong>Task:</strong> {task.taskType}</p>
                              <p><strong>Details:</strong> {task.taskDetails}</p>
                              <p><strong>Status:</strong> {task.status}</p>
                            </div>
                          ))
                        : "None"}
                    </p>
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
