// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepages";
import SelectionPage from "./components/SelectionPage";
import DonorAuth from "./components/DonorAuth";
import DonationForm from "./components/DonationForm";
import ThankYouPage from "./components/thankyou";
import NGOAuth from "./components/NGOAuth";
import NGODashboard from "./components/NGODashboard";
import ViewDonations from "./components/ViewDonations";
import DonationProgress from "./components/DonationProgress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<SelectionPage />} />
        <Route path="/donor" element={<DonorAuth />} />
        <Route path="/donate-food" element={<DonationForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/ngo" element={<NGOAuth />} />
         <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/donations" element={<ViewDonations />} />
        <Route path="/progress" element={<DonationProgress />} />
        
      </Routes>
    </Router>
  );
}

export default App;
