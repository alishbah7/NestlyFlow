"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import "./usernameModal.css";
import { X } from "lucide-react";

interface UsernameUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsernameUpdateModal({
  isOpen,
  onClose,
}: UsernameUpdateModalProps) {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
    setError("");
    setSuccess("");
    setIsUpdating(false);
  }, [isOpen, user]);

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    setIsUpdating(true);

    if (!username) {
      setError("Username cannot be empty.");
      setIsUpdating(false);
      return;
    }
    if (username.length > 15) {
      setError("Username cannot be more than 15 characters.");
      setIsUpdating(false);
      return;
    }
    if (/\s/.test(username)) {
      setError("Username cannot contain spaces.");
      setIsUpdating(false);
      return;
    }

    try {
      await updateUser({ username });
      setSuccess("Username updated successfully!");
      setTimeout(() => {
        onClose();
      }, 500); // Close after showing success
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
        <h2 className="modal-title">ᴜᴘᴅᴀᴛᴇ ᴜꜱᴇʀɴᴀᴍᴇ</h2>
        <div className="modal-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
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