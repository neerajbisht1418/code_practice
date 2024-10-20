import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import ChatApp from "../pages/ChatApp";
import UserChatPage from "../chat/UserChatPage";
import SellerChatPage from "../chat/sellerChatPage";
import ProductBidChatFlow from "../pages/ProductBidChatFlow";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/user-chat" element={<UserChatPage />} />
      <Route path="/seller-chat" element={<SellerChatPage />} />
      <Route path="/product-bid" element={<ProductBidChatFlow userId="6713704d225eb2492373a679" />} />
      <Route path="/bid-user" element={<ProductBidChatFlow userId="6714fffc1da200194ba8ef39" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;