import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import Navbar component
import { AuthProvider } from "@/context/AuthContext";
import GlobalChatbot from "@/components/chat/GlobalChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My To-Do Application", // Updated title
  description: "A sleek and attractive To-Do web application.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`} // Added pt-16 for fixed navbar
      >
        <AuthProvider>
          <Navbar />
          {children}
          <GlobalChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
