"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./signup.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const { signup } = useAuth();
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length > 15) {
      setUsernameError("Username should only be 15 characters long");
    } else if (/\s/.test(value)) {
      setUsernameError("Username should not contain spaces");
    } else {
      setUsernameError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (usernameError) {
      return;
    }

    try {
      await signup({ username, email, password });
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    }
  };

  useEffect(() => {
    return () => {
      setError(null);
      setUsernameError(null);
    };
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">ꜱɪɢɴ ᴜᴘ</h1>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <p className="error">{usernameError}</p>}

          <input
            type="email"
            placeholder="e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="signup-btn">
            𝚂𝚒𝚐𝚗 𝚄𝚙
          </button>
        </form>

        <p className="login-link">
          Already have an account?
          <Link href="/login" className="login-btn-signup"> Log In</Link>
        </p>
      </div>
    </div>
  );
}
