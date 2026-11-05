import { useState } from 'react';

function AuthModal({
  initialTab = 'login',
  onClose,
  onLogin,
  onSignup,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  function changeTab(tab) {
    setActiveTab(tab);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  }

  function handleLogin(event) {
    event.preventDefault();
    setMessage('');

    const result = onLogin(email, password);

    if (result?.success) {
      onClose();
    } else {
      setMessage(result?.message || 'Invalid email or password.');
    }
  }

  function handleSignup(event) {
    event.preventDefault();
    setMessage('');

    if (!name.trim()) {
      setMessage('Please enter your name.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const result = onSignup(name, email, password);

    if (result?.success) {
      onClose();
    } else {
      setMessage(result?.message || 'Unable to create your account.');
    }
  }

  return (
    <>
      <style>{`
        .auth-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: rgba(30, 24, 20, 0.58);
          backdrop-filter: blur(4px);
        }

        .auth-modal {
          width: 100%;
          max-width: 440px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px 38px 35px;
          background: #fff;
          border-radius: 25px;
          box-shadow: 0 20px 65px rgba(0,0,0,0.22);
          animation: authModalAppear 0.25s ease;
        }

        @keyframes authModalAppear {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-tabs {
          display: flex;
          align-items: center;
          position: relative;
          border-bottom: 1px solid #eaded6;
          margin-bottom: 27px;
        }

        .auth-tabs button {
          flex: 1;
          padding: 13px 5px;
          border: none;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
          background: transparent;
          color: #81756e;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .auth-tabs button.active {
          color: #f05b32;
          border-bottom-color: #f05b32;
        }

        .auth-tabs .auth-close {
          position: absolute;
          right: -22px;
          top: -20px;
          flex: none;
          width: 38px;
          height: 38px;
          padding: 0;
          border: none;
          border-radius: 50%;
          background: #fff0e8;
          color: #f05b32;
          font-size: 28px;
          cursor: pointer;
        }

        .auth-content h2 {
          margin: 0 0 8px;
          color: #332b27;
          font-family: Georgia, serif;
          font-size: 29px;
        }

        .auth-content > p {
          margin: 0 0 23px;
          color: #81756e;
          font-size: 14px;
          line-height: 1.6;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .auth-form label {
          margin-top: 5px;
          color: #514943;
          font-size: 14px;
          font-weight: 700;
        }

        .auth-form input {
          width: 100%;
          height: 48px;
          padding: 0 15px;
          border: 1px solid #e6d9d1;
          border-radius: 12px;
          outline: none;
          background: #eaf1ff;
          color: #332b27;
          font-size: 14px;
        }

        .auth-form input:focus {
          border-color: #f05b32;
          box-shadow: 0 0 0 3px rgba(240,91,50,0.12);
        }

        .auth-submit {
          width: 100%;
          min-height: 50px;
          margin-top: 13px;
          border: none;
          border-radius: 13px;
          background: #f05b32;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .auth-submit:hover {
          background: #df4c25;
          transform: translateY(-2px);
        }

        .auth-message {
          padding: 10px;
          border-radius: 9px;
          background: #fff0ed;
          color: #c0392b;
          font-size: 13px;
        }

        @media (max-width: 480px) {
          .auth-modal {
            padding: 25px 22px 28px;
          }

          .auth-content h2 {
            font-size: 25px;
          }
        }
      `}</style>

      <div
        className="auth-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="auth-modal">
          <div className="auth-tabs">
            <button
              type="button"
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => changeTab('login')}
            >
              Login
            </button>

            <button
              type="button"
              className={activeTab === 'signup' ? 'active' : ''}
              onClick={() => changeTab('signup')}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="auth-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {activeTab === 'login' ? (
            <div className="auth-content">
              <h2>Welcome Back 👋</h2>
              <p>
                Login to explore, save and share your favourite recipes.
              </p>

              <form className="auth-form" onSubmit={handleLogin}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                {message && (
                  <div className="auth-message">{message}</div>
                )}

                <button className="auth-submit" type="submit">
                  🔐 Login
                </button>
              </form>
            </div>
          ) : (
            <div className="auth-content">
              <h2>Create Account ✨</h2>
              <p>
                Join our food community and share delicious recipes.
              </p>

              <form className="auth-form" onSubmit={handleSignup}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />

                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />

                {message && (
                  <div className="auth-message">{message}</div>
                )}

                <button className="auth-submit" type="submit">
                  ✨ Create Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthModal;