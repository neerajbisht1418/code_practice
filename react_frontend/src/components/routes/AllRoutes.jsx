import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import ChatApp from "../pages/ChatApp";
import UserChatPage from "../chat/UserChatPage";
import SellerChatPage from "../chat/sellerChatPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/user-chat" element={<UserChatPage />} />
      <Route path="/seller-chat" element={<SellerChatPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;