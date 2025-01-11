import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const StaffDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [diet, setDiet] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const navigate = useNavigate(); // hook to navigate to different routes

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching patients data
        const patientResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-patients`
        );
        setPatients(patientResponse.data.patients || []);

        // Fetching pantry staff data
        const pantryResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pantry-staffs`
        );
        setPantryStaff(pantryResponse.data.staff || []);

        // Fetching diet data
        const dietResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-diet`
        );
        setDiet(dietResponse.data.diet || []);

        // Fetching delivery personnel data
        const deliveryResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-deleviry`
        );
        setDelivery(deliveryResponse.data.delivery || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = () => {
    navigate("/get-admin"); // redirects to /get-admin page
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 p-4">
        <h1 className="text-3xl font-bold text-center text-white">Staff Dashboard</h1>
      </header>

      <main className="container mx-auto p-6">
        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg mb-6"
        >
          Go to Admin Dashboard
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
            <ul className="space-y-4">
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <li
                    key={patient._id}
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
                  >
                    <p><strong>Patient ID:</strong> {patient.patientId}</p>
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
                ))
              ) : (
                <p>No patients available</p>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">All Pantry Staff</h2>
            <ul className="space-y-4">
              {pantryStaff && pantryStaff.length > 0 ? (
                pantryStaff.map((staff) => (
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
                ))
              ) : (
                <p>No pantry staff available</p>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Diets</h2>
            <ul className="space-y-4">
              {diet && diet.length > 0 ? (
                diet.map((item) => (
                  <li
                    key={item._id}
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
                  >
                    <p><strong>Diet ID:</strong> {item.dietId}</p>
                    <p><strong>Diet Type:</strong> {item.dietType}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                  </li>
                ))
              ) : (
                <p>No diet data available</p>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">All Delivery Personnel</h2>
            <ul className="space-y-4">
              {delivery && delivery.length > 0 ? (
                delivery.map((personnel) => (
                  <li
                    key={personnel._id}
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
                  >
                    <p><strong>Name:</strong> {personnel.name}</p>
                    <p><strong>Contact:</strong> {personnel.contactInfo}</p>
                    <p><strong>Assigned Routes:</strong> {personnel.assignedRoutes.join(", ")}</p>
                  </li>
                ))
              ) : (
                <p>No delivery personnel available</p>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
