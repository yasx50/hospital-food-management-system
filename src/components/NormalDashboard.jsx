import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const StaffDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [diet, setDiet] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-patients`
        );
        setPatients(patientResponse.data.patients || []);

        const pantryResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pantry-staffs`
        );
        setPantryStaff(pantryResponse.data.staff || []);

        const dietResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-diet`
        );
        setDiet(dietResponse.data.diets || []);

        const deliveryResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/all-deleviry`
        );
        setDelivery(deliveryResponse.data.deliveries || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = () => {
    navigate("/get-admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-md">
        <h1 className="text-4xl font-extrabold text-center text-white">Hospital Food Management System</h1>
        <p className="text-center mt-2 text-lg font-light">
          "Where Nutrition Meets Care"
        </p>
      </header>

      <main className="container mx-auto p-8">
        <button
          onClick={handleRedirect}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Admin Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-500 pb-2">
              All Patients
            </h2>
            <ul className="space-y-6">
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <li
                    key={patient._id}
                    className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <p className="font-medium"><strong>Patient ID:</strong> {patient.patientId}</p>
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
                <p className="text-gray-400">No patients available</p>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-500 pb-2">
              Pantry Staff
            </h2>
            <ul className="space-y-6">
              {pantryStaff && pantryStaff.length > 0 ? (
                pantryStaff.map((staff) => (
                  <li
                    key={staff._id}
                    className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <p><strong>Name:</strong> {staff.name}</p>
                    <p><strong>Contact:</strong> {staff.contactInfo}</p>
                    <p><strong>Location:</strong> {staff.location}</p>
                    <p><strong>Assigned Tasks:</strong> {staff.assignedTasks.length > 0 ? (
                      <ul className="list-disc pl-6">
                        {staff.assignedTasks.map((task) => (
                          <li key={task._id} className="mt-2">
                            <p><strong>Task:</strong> {task.taskType}</p>
                            <p><strong>Details:</strong> {task.taskDetails}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                          </li>
                        ))}
                      </ul>
                    ) : "None"}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No pantry staff available</p>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-500 pb-2">
              Diet Plans
            </h2>
            <ul className="space-y-6">
              {diet && diet.length > 0 ? (
                diet.map((item) => (
                  <li
                    key={item._id}
                    className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <p><strong>Diet ID:</strong> {item._id}</p>
                    <p><strong>Morning Meal:</strong> {item.meals.morning}</p>
                    <p><strong>Evening Meal:</strong> {item.meals.evening}</p>
                    <p><strong>Night Meal:</strong> {item.meals.night}</p>
                    <p><strong>Instructions:</strong> {item.instructions}</p>
                    <p><strong>Ingredients:</strong> {item.ingredients.join(", ")}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No diet plans available</p>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-500 pb-2">
              Delivery Personnel
            </h2>
            <ul className="space-y-6">
              {delivery && delivery.length > 0 ? (
                delivery.map((personnel) => (
                  <li
                    key={personnel._id}
                    className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <p><strong>Name:</strong> {personnel.name}</p>
                    <p><strong>Contact:</strong> {personnel.contactInfo}</p>
                    <p><strong>Assigned Routes:</strong> {personnel.assignedRoutes.join(", ")}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No delivery personnel available</p>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
