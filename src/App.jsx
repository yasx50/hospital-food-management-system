import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PatientForm from "./components/PatientForm";
import PantryStaffForm from "./components/PantryStaffForm";
import DeliveryPersonnelForm from "./components/DeliveryPersonnelForm";
import DietForm from "./components/DietForm";



const App = () => {
  return (
    <Router>
     
      <Routes>
        
        
        <Route path="/" element={<Dashboard/>} />
        <Route path="/add-patient" element={<PatientForm />} />
        <Route path="/add-PantryStaff" element={ <PantryStaffForm/>} />
        <Route path="/add-addDeleviry" element={ <DeliveryPersonnelForm/>} />
        <Route path="/add-diet" element={ <DietForm/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
