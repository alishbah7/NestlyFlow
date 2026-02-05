"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "./usernameModal.css"; // Reusing the same CSS for styling
import { X } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const { deleteUser } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setPassword("");
    setError("");
    setSuccess("");
    setIsDeleting(false);
  }, [isOpen]);

  const handleDelete = async () => {
    setError("");
    setSuccess("");
    setIsDeleting(true);

    if (!password) {
      setError("Please enter your current password to delete the account.");
      setIsDeleting(false);
      return;
    }

    try {
      await deleteUser({ password });
      setSuccess("Account deleted successfully!");
      // Redirect to login page after successful deletion
      setTimeout(() => {
        onClose();
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred during account deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose}>
          <X />
        </button>
        <h2 className="modal-title" style={{ color: "red" }}>ᴅᴇʟᴇᴛᴇ ᴀᴄᴄᴏᴜɴᴛ</h2>
        <p className="delete-para">
          Are you sure you want to delete your account? This action cannot be
          undone. Please enter your password to confirm.
        </p>
        <div className="modal-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your current password"
            className="modal-input"
            disabled={isDeleting}
          />
          {error && <p className="modal-error">{error}</p>}
          {success && <p className="modal-success">{success}</p>}
        </div>
        <button
          onClick={handleDelete}
          className="modal-button delete-modal-btn"
          disabled={isDeleting}
        >
          {isDeleting ? "𝖣𝖾𝗅𝖾𝗍𝗂𝗇𝗀..." : "𝙳𝚎𝚕𝚎𝚝𝚎 𝙰𝚌𝚌𝚘𝚞𝚗𝚝"}
        </button>
      </div>
    </div>
  );
}
