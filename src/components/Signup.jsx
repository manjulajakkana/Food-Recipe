import { useState } from 'react';

function Signup({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (password.length < 6) {
      setMessage('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const result = onSignup(name, email, password);

    if (!result?.success) {
      setMessage(result?.message || 'Unable to create account.');
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">📝</div>

        <p className="section-kicker">JOIN OUR COMMUNITY</p>
        <h1>Create Account</h1>

        <p className="auth-subtext">
          Sign up and start exploring delicious recipes.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          {message && (
            <p className="auth-error" role="alert">
              {message}
            </p>
          )}

          <button type="submit" className="auth-submit-btn">
            ✅ Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>

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

export default Signup;