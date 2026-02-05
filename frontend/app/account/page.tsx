"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "./account.css";
import UsernameUpdateModal from "@/components/account/UsernameUpdateModal";
import PasswordUpdateModal from "@/components/account/PasswordUpdateModal";
import DeleteAccountModal from "@/components/account/DeleteAccountModal";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    if (!user) router.push("/login");
    else setUsername(user.username);
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="account-wrapper">
      <h2 className="account-title">𝖯𝖾𝗋𝗌𝗈𝗇𝖺𝗅 𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇</h2>

      <div className="account-grid">
        {/* Username Card */}
        <div className="info-card">
          <div className="card-icon">👤</div>
          <p className="card-label">Username</p>
          <p className="card-value">{username}</p>

          <button
            className="card-action"
            onClick={() => setIsUsernameModalOpen(true)}
          >
            Update
          </button>
        </div>

        {/* Email Card */}
        <div className="info-card">
          <div className="card-icon">📧</div>
          <p className="card-label">Email</p>
          <p className="card-value card-value-mail">{user.email}</p>
        </div>

        {/* Password Card */}
        <div className="info-card">
          <div className="card-icon">🔒</div>
          <p className="card-label">Password</p>
          <p className="card-value">••••••••</p>

          <button
            className="card-action"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Update
          </button>
        </div>
      </div>
      
      <div className="btns">
        <button
          className="acc-btn delete-btn"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          𝙳𝚎le𝚝e 𝙰ccoun𝚝
        </button>

        <button
          className="acc-btn"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          𝙻og 𝙾ut
        </button>
      </div>

      <UsernameUpdateModal
        isOpen={isUsernameModalOpen}
        onClose={() => {
          setIsUsernameModalOpen(false);
        }}
      />
      <PasswordUpdateModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
