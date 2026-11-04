
import React, { useState } from "react";

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const result = onLogin(email, password);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <p>Login to your FOOD RECIPE account</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <button
            type="button"
            className="auth-link"
            onClick={onSwitchToSignup}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
