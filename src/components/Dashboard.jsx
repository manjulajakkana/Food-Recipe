
import React from "react";

function Dashboard({ currentUser, onLogout }) {
  const isAdmin = currentUser.role === "admin";

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        <h2>Welcome, {currentUser.name}!</h2>

        <p>Email: {currentUser.email}</p>
        <p>
          Account Type: {isAdmin ? "Administrator" : "User"}
        </p>

        {isAdmin ? (
          <div>
            <h3>Admin Module</h3>
            <p>You are logged in as the administrator.</p>
            <p>You can manage the FOOD RECIPE application.</p>
          </div>
        ) : (
          <div>
            <h3>User Module</h3>
            <p>Welcome to the FOOD RECIPE application.</p>
            <p>You can explore recipes and manage your favorites.</p>
          </div>
        )}

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
