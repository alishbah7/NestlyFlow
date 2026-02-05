"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./login.css";


export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ username: usernameOrEmail, password });
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">ʟᴏɢ ɪɴ</h2>

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
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>


          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            𝙻𝚘𝚐 𝙸𝚗
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link href="/signup" className="login-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
