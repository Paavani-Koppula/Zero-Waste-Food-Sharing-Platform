import React, { useEffect, useState } from "react";

export default function DonationProgress() {
  const [progress, setProgress] = useState({
    pending: 0,
    accepted: 0,
    pickedup: 0,
    delivered: 0,
  });
  const ngoId = localStorage.getItem("ngoId");

  const fetchProgress = async () => {
    try {
      const res = await fetch(`http://localhost:8082/donations`);
      const data = await res.json();

      const pending = data.filter((d) => d.status === "PENDING").length;
      const accepted = data.filter(
        (d) => d.status === "ACCEPTED" && d.ngoId === ngoId
      ).length;
      const pickedup = data.filter(
        (d) => d.status === "PICKEDUP" && d.ngoId === ngoId
      ).length;
      const delivered = data.filter(
        (d) => d.status === "DELIVERED" && d.ngoId === ngoId
      ).length;

      setProgress({ pending, accepted, pickedup, delivered });
    } catch (err) {
      console.error("Error fetching donation progress:", err);
    }
  };

  useEffect(() => {
    fetchProgress();
    const interval = setInterval(fetchProgress, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, [ngoId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Donation Progress</h2>
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>🕰️ Pending</h3>
          <p style={styles.statCount}>{progress.pending}</p>
        </div>
        <div style={styles.statCard}>
          <h3>✅ Accepted</h3>
          <p style={styles.statCount}>{progress.accepted}</p>
        </div>
        <div style={styles.statCard}>
          <h3>🚚 Picked Up</h3>
          <p style={styles.statCount}>{progress.pickedup}</p>
        </div>
        <div style={styles.statCard}>
          <h3>📦 Delivered</h3>
          <p style={styles.statCount}>{progress.delivered}</p>
        </div>
      </div>
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
  heading: {
    fontSize: "26px",
    marginBottom: "20px",
    textAlign: "center",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  statCard: {
    background: "#fff",
    border: "2px solid #eee",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statCount: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};
