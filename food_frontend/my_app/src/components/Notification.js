import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an SSE connection to your backend
    const eventSource = new EventSource(
      "http://localhost:8082/api/notifications/stream"
    );

    // Listen for messages from the backend
    eventSource.onmessage = (event) => {
      console.log("New notification:", event.data);
      // Add the new notification to the top of the list
      setNotifications((prev) => [event.data, ...prev]);
    };

    // Handle errors
    eventSource.onerror = (err) => {
      setError("Error occurred while connecting to the notification stream");
      console.error("SSE connection error:", err);
      eventSource.close(); // Close connection on error
    };

    // Log successful connection
    eventSource.onopen = () => {
      console.log("Connected to the notification stream");
    };

    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Live Notifications</h2>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : notifications.length === 0 ? (
        <p style={styles.empty}>No notifications yet.</p>
      ) : (
        <ul style={styles.list}>
          {notifications.map((note, index) => (
            <li key={index} style={styles.item}>
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "#fff",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
  },
};
