import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NGOAuth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8082/ngos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("ngoId", data.id);
        localStorage.setItem("ngoName", data.name);
        alert("NGO Login successful!");
        navigate("/ngo-dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Network or backend error:", error);
      alert("Error logging in. Make sure backend is running on port 8082 and CORS is enabled.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formCard}>
        {/* Left Side - Image */}
        <div style={leftSide}>
          <img
            src="/images/ngo.png" // 👉 replace with your own NGO image
            alt="NGO Login"
            style={imageStyle}
          />
        </div>

        {/* Right Side - Form */}
        <div style={rightSide}>
          <h2 style={titleStyle}>NGO Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ---------- Styles ----------
const containerStyle = {
  backgroundColor: "#fed9b7",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formCard = {
  display: "flex",
  flexDirection: "row",
  minHeight: "400px",
  width: "800px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
};

const leftSide = {
  flex: 1,
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "80%",
  height: "auto",
};

const rightSide = {
  flex: 1,
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "#fdfcdc"
};

const titleStyle = {
  color: "#000",
  textAlign: "center",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "150px", // 👈 smaller button
  padding: "10px",
  backgroundColor: "#ff6600",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: "bold",
  margin: "0 auto", // centers the button
  display: "block",
};
