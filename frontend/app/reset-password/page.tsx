"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordConfirm } from "@/services/api";
import "./reset-password.css";

// This new component will contain the logic that relies on client-side hooks
const ClientResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const paramToken = searchParams.get("token");
    setToken(paramToken);

    if (!paramToken) {
      router.push("/login");
    } else {
      setShowForm(true);
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Confirm password should be the same as new password");
      return;
    }
    setIsResetting(true);
    try {
      if (!token) {
        setError("Invalid or expired token.");
        return;
      }
      await resetPasswordConfirm(token, password);
      setMessage("Your password has been reset");
      setShowForm(false);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Failed to reset password. Invalid or expired token.");
    } finally {
      setIsResetting(false);
    }
  };

  if (token === null && !message) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reset-password-bg">
      <div className="reset-password-card">
        {showForm ? (
          <>
            <h2 className="reset-password-title">Reset Password</h2>
            <form className="reset-password-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="label-new-pass">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="reset-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="label-new-pass">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="reset-password-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className="reset-password-error">{error}</p>}
              <button
                type="submit"
                className="reset-password-button"
                disabled={isResetting}
              >
                {isResetting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <p className="reset-password-message">{message}</p>
        )}
      </div>
    </div>
  );
};


// The main page component will conditionally render the ClientResetPasswordForm
const ResetPasswordPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>; // Show a loading indicator during SSR/prerendering
  }

  return <ClientResetPasswordForm />;
};

export default ResetPasswordPage;