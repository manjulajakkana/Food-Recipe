function Dashboard({ currentUser, onLogout, onHome }) {
  return (
    <main className="user-dashboard">
      <div className="dashboard-card">
        <div className="auth-icon">👋</div>

        <p className="section-kicker">YOUR ACCOUNT</p>
        <h1>Welcome, {currentUser?.name}!</h1>

        <p className="dashboard-description">
          Your Food Recipe account is ready.
        </p>

        <div className="dashboard-details">
          <div>
            <strong>Name</strong>
            <span>{currentUser?.name}</span>
          </div>

          <div>
            <strong>Email</strong>
            <span>{currentUser?.email}</span>
          </div>

          <div>
            <strong>Account Type</strong>
            <span>{currentUser?.role || 'user'}</span>
          </div>
        </div>

        <div className="dashboard-actions">
          <button className="primary-button" onClick={onHome}>
            🍽️ Explore Recipes
          </button>

          <button className="secondary-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;