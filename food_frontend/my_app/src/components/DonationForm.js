import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DonationForm() {
  const [form, setForm] = useState({
    donorName: "",
    email: "",
    mobile: "",
    foodType: "",
    foodName: "",
    quantity: "",
    location: "",
    pickupTime: "",
    bestBefore: "",
  });

  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      alert("Email must be a valid @gmail.com address");
      return;
    }

    try {
      const res = await fetch("http://localhost:8082/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Pending" }),
      });

      const raw = await res.json();
      console.log("Response Body:", raw);

      if (res.ok) navigate("/thank-you");
      else throw new Error(`Failed with status ${res.status}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const formatFromBDC = (d) => {
    const parts = [d.locality, d.city, d.principalSubdivision, d.postcode, d.countryName].filter(Boolean);
    return parts.join(", ");
  };
  const formatFromNominatim = (d) => d.display_name || "";

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const bdc = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          ).then((r) => r.json());

          let address = formatFromBDC(bdc);

          if (!address) {
            const osm = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18&accept-language=en`
            ).then((r) => r.json());
            address = formatFromNominatim(osm);
          }

          if (!address) address = `Lat: ${latitude}, Lon: ${longitude}`;
          setForm((f) => ({ ...f, location: address }));
        } catch (e) {
          console.error(e);
          alert("Couldn't fetch a precise address. Please type it manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        console.error(err);
        setLocating(false);
        alert("Unable to fetch location. Please enter your address manually.");
      }
    );
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ color: "#fa6c0eff", textAlign: "center", marginBottom: 20, marginTop: "-50px", marginLeft: "-98px" }}>
        🍴 Food Details
      </h2>

      <form onSubmit={handleSubmit} style={gridForm}>
        {/* Left Column */}
        <div>
          <label style={labelStyle}>Donor Name</label>
          <input
            type="text"
            required
            value={form.donorName}
            onChange={(e) => setForm({ ...form, donorName: e.target.value })}
            style={underlineInput}
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={underlineInput}
          />

          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            required
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            style={underlineInput}
          />

          <label style={labelStyle}>Type of Food</label>
          <select
            required
            value={form.foodType}
            onChange={(e) => setForm({ ...form, foodType: e.target.value })}
            style={underlineInput}
          >
            <option value="">-- Select --</option>
            <option value="Packed Food">Packed Food</option>
            <option value="Unpacked Food">Unpacked Food</option>
            <option value="Leftovers">Leftovers</option>
          </select>

          <label style={labelStyle}>Food Name</label>
          <input
            type="text"
            required
            value={form.foodName}
            onChange={(e) => setForm({ ...form, foodName: e.target.value })}
            style={underlineInput}
          />
        </div>

        {/* Right Column */}
        <div>
          <label style={labelStyle}>Food Quantity</label>
          <input
            type="text"
            required
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            style={underlineInput}
          />

          <label style={labelStyle}>Location</label>
          <textarea
            rows="2"
            placeholder="Enter full address or landmark"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            style={underlineTextarea}
          />
          <button type="button" onClick={handleLocation} style={smallButton} disabled={locating}>
            {locating ? "Locating…" : "📍 Use My Current Location"}
          </button>

          <label style={labelStyle}>Pickup Time</label>
          <input
            type="time"
            required
            value={form.pickupTime}
            onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
            style={underlineInput}
          />

          <label style={labelStyle}>Best Before</label>
          <input
            type="datetime-local"
            required
            value={form.bestBefore}
            onChange={(e) => setForm({ ...form, bestBefore: e.target.value })}
            style={underlineInput}
          />
        </div>
      </form>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button type="submit" style={buttonStyle} onClick={handleSubmit}>
          Confirm Donation ✅
        </button>
      </div>
    </div>
  );
}

// ---------- Styles ----------
const pageStyle = {
  backgroundColor: "#f9dcc4", // ✅ Transparent background (removed image)
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
};

const gridForm = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  width: "100%",
  maxWidth: "900px",
};

const labelStyle = {
  display: "block",
  marginBottom: "4px",
  marginTop: "12px",
  fontWeight: "bold",
  color: "#111",
  textShadow: "0 1px 2px rgba(255,255,255,0.6)",
};

const underlineInput = {
  width: "100%",
  padding: "8px 5px",
  marginBottom: "10px",
  border: "none",
  borderBottom: "2px solid #222",
  outline: "none",
  fontSize: "15px",
  backgroundColor: "rgba(255,255,255,0.8)",
  color: "#111",
  borderRadius: "4px",
};

const underlineTextarea = {
  width: "100%",
  padding: "8px 5px",
  marginBottom: "10px",
  border: "none",
  borderBottom: "2px solid #222",
  outline: "none",
  fontSize: "15px",
  resize: "none",
  backgroundColor: "rgba(255,255,255,0.8)",
  color: "#111",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "orange",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "20px",
  boxShadow: "0px 3px 8px rgba(0,0,0,0.3)",
};

const smallButton = {
  marginTop: "6px",
  padding: "6px 12px",
  backgroundColor: "orange",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
};
