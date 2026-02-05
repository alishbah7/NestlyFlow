"use client";
import { useState } from "react";
import { forgotPassword } from "@/services/api";
import "./forgot-password.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await forgotPassword(email);
      setMessage(
        "If your email exist then a password reset link will be sent to it. If you could not find email in inbox then must check spam folder."
      );
      setShowForm(false);
    } catch (err) {
      setMessage(
        "If your email exist then a password reset link will be sent to it. If you could not find email in inbox then must check spam folder."
      );
      setShowForm(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="forgot-password-bg">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">
          Forgot Password
        </h2>
        {showForm ? (
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="label-reg-email"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="forgot-password-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="forgot-password-button"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <p className="forgot-password-message">{message}</p>
        )}
      </div>
    </div>
  );
}
