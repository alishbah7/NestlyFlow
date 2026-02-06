"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import heroimg from "../public/images/heroimg.png";
import { useRouter } from "next/navigation";

import { Instagram, Facebook, Linkedin, X } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStartedClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <div className="hero-pill" onClick={handleGetStartedClick} style={{ cursor: 'pointer' }}>
            <span className="pill-label">New</span>
            <span className="pill-text">Explore Our Advance Features</span>
            <span className="pill-arrow">→</span>
          </div>

          <div className="hero-heading">
            <span className="headingbg">Effortless</span> Tasks Management For{" "}
            <span className="headingbg">Teams</span> &{" "}
            <span className="headingbg">Individuals</span>.
          </div>

          <p className="hero-subtext">
            Our service caters both to both teams and Individuals, ensuring
            everyone can stay organized and focused.
          </p>

          <div className="hero-actions">
            <div onClick={handleGetStartedClick} className="primary-btn" style={{ cursor: 'pointer' }}>
              {user ? "Dashboard" : "Get Started"}
              <span className="btn-arrow">↗</span>
            </div>

            <Link href="#about-us" className="secondary-btn">
              About Us
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <Image
            src="/images/heroimg.png"
            alt="Hero Vector"
            width={500}
            height={500}
            className="hero-image"
          />

          <div className="overlay-box box1">
            <span>Tasks Master</span>
            <p>10+ Users</p>
          </div>
          <div className="overlay-box box2">
            <span>Plan Better</span>
            <p>10+ Features</p>
          </div>
        </div>
      </section>

      <section className="reports-section" id="about-us">
        <div className="reports-container">
          <div className="reports-images">
            <Image
              src="/images/about-pink.jpg"
              alt="Reports dashboard"
              className="reports-img-main"
              width={400}
              height={400}
            />
          </div>

          <div className="reports-content">
            <div className="about-heading">
              𝑴𝒂𝒏𝒂𝒈𝒆 𝒀𝒐𝒖𝒓 <br /> 𝑻𝒂𝒔𝒌𝒔 𝑬𝒇𝒇𝒊𝒄𝒊𝒆𝒏𝒕𝒍𝒚
            </div>
            <p>
              Our tasks management service helps individuals and teams stay
              focused, organized, and in control of their work. Plan smarter,
              track progress effortlessly, and turn everyday tasks into
              meaningful results.
            </p>
            <div onClick={handleGetStartedClick} className="reports-btn" style={{ cursor: 'pointer' }}>
              {user ? "Dashboard" : "Get Started"}
              <span>➜</span>
            </div>
          </div>
        </div>
      </section>

      <div className="footer" id="footer">
        <div className="footer-custom">
          <h2 className="footer-title">ɴᴇꜱᴛʟʏғʟᴏᴡ</h2>

          <div className="footer-social">
            <Link href="https://www.instagram.com/innolyze_/" className="social-icon">
              <Instagram size={24} />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61579966714044" className="social-icon">
              <Facebook size={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/alishbah-m-kamran-598318316/?originalSubdomain=pk" className="social-icon">
              <Linkedin size={24} />
            </Link>
            <Link href="https://x.com/_alishbah04_" className="social-icon">
              <X size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
