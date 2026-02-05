"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import "./usernameModal.css"; // Reusing the same CSS for styling
import { X } from "lucide-react";

interface PasswordUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordUpdateModal({
  isOpen,
  onClose,
}: PasswordUpdateModalProps) {
  const { resetPassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setCurrentPassword("");
    setNewPassword("");
    setError("");
    setSuccess("");
    setIsUpdating(false);
  }, [isOpen]);

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    setIsUpdating(true);

    if (!currentPassword || !newPassword) {
      setError("Both current and new passwords are required.");
      setIsUpdating(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      setIsUpdating(false);
      return;
    }

    console.log("Attempting password reset with:", { currentPassword, newPassword });
    try {
      await resetPassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccess("Password updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1500); // Close after showing success
    } catch (err: any) {
      setError(err.message || "An error occurred during update.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose}>
          <X />
        </button>
        <h2 className="modal-title">ᴜᴘᴅᴀᴛᴇ ᴘᴀꜱꜱᴡᴏʀᴅ</h2>
        <div className="modal-form">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="modal-input"
            disabled={isUpdating}
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="modal-input"
            disabled={isUpdating}
          />
          {error && <p className="modal-error">{error}</p>}
          {success && <p className="modal-success">{success}</p>}
        </div>
        <button
          onClick={handleUpdate}
          className="modal-button"
          disabled={isUpdating}
        >
          {isUpdating ? "𝚄𝚙𝚍𝚊𝚝𝚒𝚗𝚐..." : "𝚄𝚙𝚍𝚊𝚝𝚎"}
        </button>
      </div>
    </div>
  );
}