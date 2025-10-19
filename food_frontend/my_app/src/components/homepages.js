import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/images/food-sharing.png')", // full background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#ffffff",
            whiteSpace: "nowrap", // ensures single line
          }}
        >
          Welcome to Zero Waste Food Sharing Platform
        </h1>

        <h3
          style={{
            color: "#ff6600",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          SUPPORT THOSE IN NEED
        </h3>

        <p
          style={{
            fontSize: "18px",
            color: "#f0f0f0",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          We connect individuals and organizations to share surplus food with
          people who need it most. By reducing food waste, we not only fight
          hunger but also protect our environment. Every meal shared brings us
          closer to a sustainable and caring community. Join us to make a real
          difference.
        </p>

        <button
          onClick={() => navigate("/select")}
          style={{
            padding: "14px 35px",
            fontSize: "18px",
            backgroundColor: "#ff6600",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
