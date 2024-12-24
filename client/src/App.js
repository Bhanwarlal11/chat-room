import React from "react";
import { useAuth } from "./context/authContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/Login.js'
import ChatRoom from "./pages/ChatRoom.js";


const App = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route path="/rooms" element={<ChatRoom/>} />

        {/* Default Route */}
        {/* <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "user" ? (
                <Navigate to="/login" /> // Redirect to login if role is "user"
              ) : role === "admin" ||
                role === "manager" ||
                role === "teamMember" ? (
                <Navigate to="/admin" /> // Redirect to admin if role is "admin" or other roles
              ) : null
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          }
        /> */}

        {/* User Routes */}
        {/* <Route
          path="/"
          element={
            isAuthenticated && role === "user" ? (
              <AuthLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/tickets" element={<UserTickets />} />
          <Route
            path="/tickets/:ticketID"
            element={<UserTicketDetail />}
          />
          <Route path="/profile" element={<Profile />} />
        </Route> */}

        {/* Admin Routes */}
        {/* <Route
          path="/admin"
          element={
            isAuthenticated &&
            (role === "admin" ||
              role === "manager" ||
              role === "teamMember") ? (
              <AuthLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route
            path="/admin/tickets/:ticketID"
            element={<AdminTicketDetail />}
          />
          <Route path="/admin/profile" element={<Profile />} />
        </Route> */}

        
      </Routes>
    </Router>
  );
};

export default App;

