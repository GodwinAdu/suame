import { Routes, Route } from "react-router-dom"
import { Home, Login, Register } from "./pages"
import ReportPage from "./pages/ReportPage"
import AccountantPage from "./pages/AccountantPage"
import LiteraturePage from "./pages/LiteraturePage"
import AttendantPage from "./pages/AttendantPage"
import AssignmentPage from "./pages/AssignmentPage"
import GroupoverseerPage from "./pages/GroupoverseerPage"
import UserProfile from "./pages/UserProfile"
import SchedulePage from "./pages/SchedulePage"
import PrivateRoutes from "./PrivateRoutes"
import { fetchUser } from './utils/fetchMainUser'
import { getUser } from "./helper/helper"
import { useEffect, useState } from "react"
import GroupReport from "./pages/GroupReport"
import AllGroupReport from "./pages/AllGroupReport"
import Settings from "./pages/Settings"
import Chatroom from "./pages/Chatroom"
import LoginModal from "./component/LoginModal"
import NetworkStatus from "./component/NetworkStatus"
import InterestedPage from "./pages/InterestedPage"

const App = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Token not found, user needs to log in

      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding token payload
      const expirationTime = new Date(decodedToken.exp * 1000); // Convert exp to milliseconds
      const currentTime = new Date();
  

      if (currentTime > expirationTime) {
        // Token has expired, remove it from localStorage
        localStorage.removeItem('token');
        setIsLoginModalOpen(true);
      }
    };

    // Initial check when component mounts
    checkTokenExpiration();

    // Set interval to check token expiration every minute (adjust as needed)
    const intervalId = setInterval(checkTokenExpiration, 100); // Every minute

    return () => {
      clearInterval(intervalId); // Clean up interval when component unmounts
    };
  }, []);
  return (
    <div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <NetworkStatus />
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home  />} />
          <Route path="/report/:userId" element={<ReportPage  />} />
          <Route path="/schedule/:userId" element={<SchedulePage />} />
          <Route path="/attendant" element={<AttendantPage  />} />
          <Route path="/accountant" element={<AccountantPage  />} />
          <Route path="/assignment" element={<AssignmentPage  />} />
          <Route path="/literature" element={<LiteraturePage  />} />
          <Route path="/groupoverseer" element={<GroupoverseerPage  />} />
          <Route path="/user-profile/:userId" element={<UserProfile  />} />
          <Route path="/group-report" element={<AllGroupReport  />} />
          <Route path="/group-report/:userId" element={<GroupReport  />} />
          <Route path="/settings" element={<Settings  />} />
          <Route path="/chatroom" element={<Chatroom  />} />
          <Route path="/interested/:userId" element={<InterestedPage  />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
