import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProtectedRoute from "./Protectedroute"; // ← import it

// Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import StartChat from "../pages/StartChat/StartChat";
import History from "../pages/History/History";
import HistoryList from "../pages/History/historyList";
import Bookmark from "../pages/Bookmark/Bookmarkpage";
import Project from "../pages/Project/Projectpage";
import SharedFilePage from "../pages/Sharedfile/Sharedfilepage";
import Success from "../pages/Success/Success";

// Auth
import Splash from "../auth/Splash/Splash";
import FO2Registration from "../auth/FO2Registration/FO2Registration";
import FO2Login from "../auth/Fo2login/Fo2login";
import RestoreAccount from "../auth/RestoreAccount/RestoreAccount";
import OtpVerification from "../auth/OtpVerification/OtpVerification";
import SetNewPassword from "../auth/SetNewPassword/SetNewPassword";
import PasswordSuccess from "../auth/PasswordSuccess/PasswordSuccess";
import GoogleSuccess from "../auth/GoogleSuccess/GoogleSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";
import SharedConversationPage from "../pages/Sharedfile/Sharedconversationpage"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes — public, no login needed */}
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<FO2Registration />} />
        <Route path="/login" element={<FO2Login />} />
        <Route path="/restore-account" element={<RestoreAccount />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />
        <Route path="/auth/google/failed" element={<PaymentFailed />} />



        {/* Protected Routes — login required */}
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="startchat" element={<StartChat />} />
            <Route path="/app/chat/:conversationId" element={<StartChat />} />
            <Route path="history" element={<History />} />
            <Route path="historylist" element={<HistoryList />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="project" element={<Project />} />
            <Route path="shared" element={<SharedFilePage />} />
            <Route path="success" element={<Success />} />
            <Route path="failed" element={<PaymentFailed />} />
            

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;