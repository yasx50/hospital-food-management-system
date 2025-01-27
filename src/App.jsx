import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import PantryStaffForm from "./components/PantryStaffForm";
import DeliveryPersonnelForm from "./components/DeliveryPersonnelForm";
import DietForm from "./components/DietForm";
import AuthForm from "./components/AuthForm";
import NormalDashboard from "./components/NormalDashboard";



const App = () => {
  return (
    <Router>
     
      <Routes>
        
        
        <Route path="/" element={<NormalDashboard/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/add-patient" element={<PatientForm />} />
        <Route path="/add-PantryStaff" element={ <PantryStaffForm/>} />
        <Route path="/add-addDeleviry" element={ <DeliveryPersonnelForm/>} />
        <Route path="/add-diet" element={ <DietForm/>} />
        <Route path="/get-admin" element={<AuthForm/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
