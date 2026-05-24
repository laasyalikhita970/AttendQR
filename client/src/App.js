import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScanQR from "./pages/ScanQR";
import AttendanceHistory from "./pages/AttendanceHistory";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
<Route
  path="/dashboard"
  element={
    <RoleRoute allowedRole="teacher">
      <Dashboard />
    </RoleRoute>
  }
/>

<Route
  path="/scan"
  element={
    <RoleRoute allowedRole="student">
      <ScanQR />
    </RoleRoute>
  }
/>

<Route
  path="/history"
  element={
    <RoleRoute allowedRole="teacher">
      <AttendanceHistory />
    </RoleRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;