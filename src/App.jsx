import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogoScreen from "./Components/LogoScreen";
import RoleSelection from "./Components/RoleSelection";
import LoginPage from "./Components/LoginPage";

// Import all 4 specific dashboards
import StudentDashboard from "./Components/StudentDashboard";
import ManagementDashboard from "./Components/ManagementDashboard";
import TeacherDashboard from "./Components/TeacherDashboard";
import ParentsDashboard from "./Components/ParentsDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoScreen />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/login/:role" element={<LoginPage />} />

        {/* Explicitly defined routes for each role's dashboard */}
        <Route path="/dashboard/student" element={<StudentDashboard />} /> 
        <Route path="/dashboard/management" element={<ManagementDashboard />} /> 
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} /> 
        <Route path="/dashboard/parents" element={<ParentsDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;