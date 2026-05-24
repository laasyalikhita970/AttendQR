import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScanQR from "./pages/ScanQR";
import AttendanceHistory from "./pages/AttendanceHistory";
import MyAttendance from "./pages/MyAttendance";

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
      <ProtectedRoute>
        <RoleRoute allowedRole="teacher">
          <Dashboard />
        </RoleRoute>
      </ProtectedRoute>
    }
  />

  <Route
    path="/scan"
    element={
      <ProtectedRoute>
        <RoleRoute allowedRole="student">
          <ScanQR />
        </RoleRoute>
      </ProtectedRoute>
    }
  />

  <Route
    path="/history"
    element={
      <ProtectedRoute>
        <RoleRoute allowedRole="teacher">
          <AttendanceHistory />
        </RoleRoute>
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-attendance"
    element={
      <ProtectedRoute>
        <RoleRoute allowedRole="student">
          <MyAttendance />
        </RoleRoute>
      </ProtectedRoute>
    }
  />

</Routes>

    </BrowserRouter>

  );

}

export default App;