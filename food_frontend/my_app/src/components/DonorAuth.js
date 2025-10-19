import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DonorAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    const payload = isLogin
      ? { name: form.name, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    const endpoint = isLogin ? "/auth/login-donor" : "/auth/register-donor";

    try {
      const res = await axios.post(`http://localhost:8082${endpoint}`, payload);
      alert(res.data);

      if (isLogin) {
        navigate("/donate-food");
      } else {
        toggleForm();
      }
    } catch (err) {
      console.error("Error:", err);
      alert(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Left Half - Image */}
        <div style={leftHalf}></div>

        {/* Right Half - Form */}
        <div style={rightHalf}>
          <div style={{ width: "100%", maxWidth: "350px" }}>
            <h2 style={titleStyle}>
              {isLogin ? "Donor Login" : "Donor Registration"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
              />
              {!isLogin && (
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  style={inputStyle}
                />
              )}
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={inputStyle}
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                  style={inputStyle}
                />
              )}
              <button type="submit" style={buttonStyle}>
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <p style={toggleText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span style={linkStyle} onClick={toggleForm}>
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Styles ----------
const containerStyle = {
  backgroundColor: "#fed9b7", // full background
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  width: "800px",
  height: "500px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#fff",
};

const leftHalf = {
  flex: 1,
  backgroundImage: "url('/images/fooddonar.png')", // replace with your image
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightHalf = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  backgroundColor: "#fdfcdc",
};

const titleStyle = {
  color: "#000",
  textAlign: "center",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "150px",   
  padding: "10px",  
  backgroundColor: "#ff6600",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px", 
  cursor: "pointer",
  fontWeight: "bold",
  display: "block",
  margin: "0 auto", 
};


const toggleText = {
  textAlign: "center",
  color: "#000",
  marginTop: "15px",
};

const linkStyle = {
  color: "#ff6600",
  cursor: "pointer",
  fontWeight: "bold",
};
