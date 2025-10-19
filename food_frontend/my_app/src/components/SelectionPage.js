import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f9dcc4, #f9dcc4)", // white → light orange background
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#000000",
          marginBottom: "50px",
          textAlign: "center",
        }}
      >
        Choose Who You Are???
      </h2>

      {/* Cards container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Donor Card */}
        <div
          onClick={() => navigate("/donor")}
          style={{
            width: "250px",
            height: "260px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            textAlign: "center",
            padding: "20px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
          }}
        >
          <img
            src="/images/donor-icon.png"
            alt="Donor"
            style={{ width: "80px", height: "80px", marginBottom: "15px" }}
          />
          <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#ff6600" }}>
            I'm a Donor
          </h3>
          <p style={{ fontSize: "14px", color: "#333" }}>
            Donate surplus food & help those in need
          </p>
        </div>

        {/* NGO Card */}
        <div
          onClick={() => navigate("/ngo")}
          style={{
            width: "250px",
            height: "260px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            textAlign: "center",
            padding: "20px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
          }}
        >
          <img
            src="/images/ngo-icon.png"
            alt="NGO"
            style={{ width: "80px", height: "80px", marginBottom: "15px" }}
          />
          <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#ff6600" }}>
            I'm an NGO
          </h3>
          <p style={{ fontSize: "14px", color: "#333" }}>
            Collect & distribute food to the community
          </p>
        </div>

        
      </div>
    </div>
  );
}
