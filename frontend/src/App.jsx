import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DonateForm from "./pages/DonateForm";
import NgoList from "./pages/NgoList";
import AdminDonations from "./pages/AdminDonations";
import './App.css';
import AdminStats from "./pages/AdminStats";
import NgoManagement from "./pages/NgoManagement";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonateForm />} />
        <Route path="/ngos" element={<NgoList />} />
        <Route path="/admin/donations" element={<AdminDonations />} />
        <Route path="/admin/stats" element={<AdminStats />} />
       <Route path="/admin/ngos" element={<NgoManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
