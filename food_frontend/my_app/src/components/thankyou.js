// src/components/ThankYouPage.js
import React from "react";

export default function ThankYouPage() {
  return (
    <div style={containerStyle}>
      {/* Food Image */}
      <img
        src="/images/thankyou.png" // 👉 your thank you image
        alt="Thank You"
        style={imageStyle}
      />

      {/* Thank You Message */}
      <h1 style={thankTextStyle}>Thank You for your Donation!</h1>

      {/* Inspirational Quote */}
      <p style={quoteStyle}>
        "Giving food is not charity; it is an expression of humanity and compassion."  
        
      </p>
    </div>
  );
}

// ---------- Styles ----------
const containerStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f7d6e9ff, #f7d6e9ff)", // 🌿 soft gradient background
  textAlign: "center",
  padding: "20px",
};

const imageStyle = {
  width: "220px",
  height: "220px",
  marginBottom: "20px",
};

const thankTextStyle = {
  fontSize: "30px",
  fontWeight: "bold",
  color: "#4b2c5e", // purple accent
  fontFamily: "'Comic Sans MS', 'cursive', sans-serif",
  marginBottom: "15px",
};

const quoteStyle = {
  fontSize: "18px",
  fontStyle: "italic",
  color: "#333",
  maxWidth: "600px",
  lineHeight: "1.6",
};
