
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/auth/RegisterPage";
import Login from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import AdminPage from "./pages/dashboard/AdminPage";

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage/></ProtectedRoute> } />
      <Route path="/admin" element={<AdminProtectedRoute> <AdminPage/></AdminProtectedRoute> } />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
      
    </>
  );
}

export default App;
