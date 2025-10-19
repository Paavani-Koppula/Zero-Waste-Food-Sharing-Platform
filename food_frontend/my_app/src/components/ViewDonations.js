import React, { useEffect, useState } from "react";

export default function ViewDonations() {
  const [donations, setDonations] = useState([]);
  const ngoId = localStorage.getItem("ngoId");

  const fetchDonations = async () => {
    try {
      const res = await fetch(`http://localhost:8082/donations`);
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const updateStatus = async (donationId, action) => {
    try {
      let url;
      if (action === "accept") {
        url = `http://localhost:8082/donations/${donationId}/accept/${ngoId}`;
      } else if (action === "pickup") {
        url = `http://localhost:8082/donations/${donationId}/pickup`;
      } else if (action === "deliver") {
        url = `http://localhost:8082/donations/${donationId}/deliver`;
      }

      const res = await fetch(url, { method: "POST" });

      if (res.ok) {
        // refresh donations to get correct latest NGO + status
        fetchDonations();
      } else {
        const data = await res.json();
        alert(data.error || `Failed to update donation status: ${action}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating donation status");
    }
  };

  const renderStatus = (d) => {
    // if it's your NGO
    if (String(d.ngoId) === String(ngoId)) {
      if (d.status === "PENDING") return "⏳ Pending";
      if (d.status === "ACCEPTED") return "✅ Accepted by You";
      if (d.status === "PICKEDUP") return "🚚 Picked Up by You";
      if (d.status === "DELIVERED") return "📦 Delivered by You";
    }

    // if it's other NGO
    if (d.status === "ACCEPTED") return `✅ Accepted by ${d.ngoName}`;
    if (d.status === "PICKEDUP") return `🚚 Picked Up by ${d.ngoName}`;
    if (d.status === "DELIVERED") return `📦 Delivered by ${d.ngoName}`;

    return "⏳ Pending";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📩 Donations</h2>

      {donations.length === 0 ? (
        <p>No donations available</p>
      ) : (
        <div style={styles.grid}>
          {donations.map((d) => (
            <div key={d.id} style={styles.card}>
              <p><b>Donor:</b> {d.donorName}</p>
              <p><b>Mobile:</b> {d.mobile || "Not Provided"}</p>
              <p><b>Food:</b> {d.foodName} ({d.quantity})</p>
              <p><b>Pickup Time:</b> {d.pickupTime}</p>
              <p><b>Location:</b> {d.location}</p>

              {/* Status line */}
              <p><b>Status:</b> {renderStatus(d)}</p>

              {/* Buttons only if it's YOUR NGO */}
              {d.status === "PENDING" && (
                <button style={styles.button} onClick={() => updateStatus(d.id, "accept")}>
                  ✅ Accept
                </button>
              )}

              {d.status === "ACCEPTED" && String(d.ngoId) === String(ngoId) && (
                <button style={styles.button} onClick={() => updateStatus(d.id, "pickup")}>
                  🚚 Picked Up
                </button>
              )}

              {d.status === "PICKEDUP" && String(d.ngoId) === String(ngoId) && (
                <button style={styles.button} onClick={() => updateStatus(d.id, "deliver")}>
                  📦 Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f9dcc4",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  heading: { fontSize: "26px", marginBottom: "20px", textAlign: "center" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  button: {
    backgroundColor: "orange",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
};
