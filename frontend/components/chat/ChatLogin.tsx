import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import '../../app/login/login.css';

interface ChatLoginProps {
  message: string;
}

export default function ChatLogin({ message }: ChatLoginProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ username: usernameOrEmail, password });
      // On successful login, the chatbot will re-render and the user will be logged in.
      // The parent component will handle the state change.
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="login-card" style={{ margin: 'auto', maxWidth: '320px' }}>
      <p className="chatbot-login-message">{message}</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username or Email"
          className="login-input"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
}
