import { useState } from 'react';

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.');
      return;
    }

    setLoading(true);

    const result = onLogin(email, password);

    setLoading(false);

    if (!result?.success) {
      setMessage(result?.message || 'Login failed. Please try again.');
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🍽️</div>

        <p className="section-kicker">THE FOOD RECIPE</p>
        <h1>Welcome Back!</h1>

        <p className="auth-subtext">
          Login to explore, save and share delicious recipes.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {message && (
            <p className="auth-error" role="alert">
              {message}
            </p>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : '🔐 Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignup}>
            Sign Up
          </button>
        </p>

        <div className="demo-admin">
          <strong>Demo Admin Login</strong>
          <p>Email: admin@foodrecipe.demo</p>
          <p>Password: Admin@123</p>
        </div>

        <button
          type="button"
          className="auth-home-button"
          onClick={() => window.location.reload()}
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}

export default Login;