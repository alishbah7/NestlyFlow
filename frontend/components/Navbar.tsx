"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, logout } = useAuth();

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeSheet();
  };

  const truncateUsername = (username: string) => {
    if (username.length > 8) {
      return `${username.substring(0, 8)}...`;
    }
    return username;
  };

  return (
    <header className="nav-wrapper">
      <nav className="navbar">
        {/* Logo */}
        <div className="nav-logo">
          <div className="logo-circle">ɴ</div>
          <span className="logo-text">ɴᴇꜱᴛʟʏғʟᴏᴡ</span>
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links">
          <li>
            <Link className="Links" href="/">
              Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link className="Links" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="Links" href="/tasks">
                  Tasks
                </Link>
              </li>
            </>
          )}
          <li>
            <Link className="Links" href="/#about-us">
              About
            </Link>
          </li>
          <li>
            <Link className="Links" href="/#footer">
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions">
          {user ? (
            <Link href="/account" className="sign-up-btn">
              {truncateUsername(user.username)}{" "}
              <span className="arrow-circle">➜</span>
            </Link>
          ) : (
            <Link href="/signup" className="sign-up-btn">
              Sign up <span className="arrow-circle">➜</span>
            </Link>
          )}
          <div className="mobile-sheet">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Menu className="hamburger" />
              </SheetTrigger>
              <SheetContent side="right" className="sheet-con">
                <div className="nav-logo">
                  <div className="logo-circle-sec">ɴ</div>
                  <span className="logo-text2">ɴᴇꜱᴛʟʏғʟᴏᴡ</span>
                </div>
                <ul className="nav-links-mobile">
                  <li>
                    <Link
                      className="links-mobile"
                      href="/"
                      onClick={closeSheet}
                    >
                      Home
                    </Link>
                  </li>
                  {user && (
                    <>
                      <li>
                        <Link
                          className="links-mobile"
                          href="/dashboard"
                          onClick={closeSheet}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="links-mobile"
                          href="/tasks"
                          onClick={closeSheet}
                        >
                          Tasks
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      className="links-mobile"
                      href="/#about-us"
                      onClick={closeSheet}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="links-mobile"
                      href="/#footer"
                      onClick={closeSheet}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                {user && (
                  <div className="logout-div">
                    <button onClick={handleLogout} className="logout-btn">
                      Log Out <span className="arrow-circle">➜</span>
                    </button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
