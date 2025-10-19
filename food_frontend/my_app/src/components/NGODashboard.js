import React, { useState } from "react";
import ViewDonations from "./ViewDonations"; 
import DonationProgress from "./DonationProgress";

export default function NgoDashboard() {
  const ngoName = localStorage.getItem("ngoName") || "NGO";
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {ngoName}</h1>

      {/* Show menu if no tab is active */}
      {!activeTab && (
        <div style={styles.menu}>
          <div style={styles.option} onClick={() => setActiveTab("requests")}>
            <span style={styles.icon}>📩</span>
            <p>Donation Requests</p>
          </div>
          <div style={styles.option} onClick={() => setActiveTab("progress")}>
            <span style={styles.icon}>📊</span>
            <p>Donation Progress</p>
          </div>
        </div>
      )}

      {/* Show clicked component */}
      {activeTab === "requests" && (
        <div>
          <button style={styles.backBtn} onClick={() => setActiveTab(null)}>⬅ Back</button>
          <ViewDonations />
        </div>
      )}
      {activeTab === "progress" && (
        <div>
          <button style={styles.backBtn} onClick={() => setActiveTab(null)}>⬅ Back</button>
          <DonationProgress />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f9dcc4",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  welcome: {
    fontSize: "28px",
    marginBottom: "30px",
  },
  menu: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "50px",
  },
  option: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    width: "200px",
    transition: "0.3s",
  },
  icon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },
  backBtn: {
    margin: "20px 0",
    padding: "10px 20px",
    backgroundColor: "orange",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
