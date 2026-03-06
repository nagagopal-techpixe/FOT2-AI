import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";

// Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import StartChat from "../pages/StartChat/StartChat";
import History from "../pages/History/History";
import HistoryList from "../pages/History/historyList";
import Bookmark from "../pages/Bookmark/Bookmarkpage";
import Project from "../pages/Project/Projectpage";

// Auth
import Splash from "../auth/Splash/Splash";
import FO2Registration from "../auth/FO2Registration/FO2Registration";
import FO2Login from "../auth/Fo2login/Fo2login";
import RestoreAccount from "../auth/RestoreAccount/RestoreAccount";
import OtpVerification from "../auth/OtpVerification/OtpVerification";
import SetNewPassword from "../auth/SetNewPassword/SetNewPassword";
import PasswordSuccess from "../auth/PasswordSuccess/PasswordSuccess";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<FO2Registration />} />
        <Route path="/login" element={<FO2Login />} />
        <Route path="/restore-account" element={<RestoreAccount />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />

        {/* App Routes — with Sidebar Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="startchat" element={<StartChat />} />
          <Route path="history" element={<History />} />
          <Route path="historylist" element={<HistoryList />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="project" element={<Project />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;