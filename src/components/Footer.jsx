import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Footer.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef()
  const logoRef = useRef()

  useEffect(() => {
    const footer = footerRef.current
    const logo = logoRef.current

    // Footer entrance animation
    ScrollTrigger.create({
      trigger: footer,
      start: "top 90%",
      onEnter: () => {
        gsap.fromTo(footer,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
        )
      }
    })

    // Logo pulsing animation
    if (logo) {
      gsap.to(logo, {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div ref={logoRef} className="footer-logo">
                <div className="logo-ring"></div>
                <div className="logo-core">∞</div>
              </div>
              <h3 className="brand-title">BUSHKO DIGITAL LAB</h3>
              <p className="brand-tagline">
                Crafting the future through innovative digital experiences. Where creativity meets technology.
              </p>
            </div>

            <div className="footer-links">
              <div className="link-column">
                <h4>Technology</h4>
                <ul>
                  <li><a href="#quantum">Quantum Computing</a></li>
                  <li><a href="#neural">Neural Interface</a></li>
                  <li><a href="#energy">Energy Systems</a></li>
                  <li><a href="#ai">AI Research</a></li>
                </ul>
              </div>

              <div className="link-column">
                <h4>Innovation</h4>
                <ul>
                  <li><a href="#research">Research Lab</a></li>
                  <li><a href="#projects">Active Projects</a></li>
                  <li><a href="#partnerships">Partnerships</a></li>
                  <li><a href="#future">Future Vision</a></li>
                </ul>
              </div>

              <div className="link-column">
                <h4>Connect</h4>
                <ul>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#news">News</a></li>
                  <li><a href="#community">Community</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="bottom-content">
              <p className="copyright">
                © 2025 Bushko Digital Lab. Transcending boundaries, creating infinite possibilities.
              </p>
              <div className="social-links">
                <div className="social-item">
                  <div className="social-icon">📡</div>
                </div>
                <div className="social-item">
                  <div className="social-icon">🌐</div>
                </div>
                <div className="social-item">
                  <div className="social-icon">⚡</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-background">
        <div className="bg-waves"></div>
        <div className="bg-particles"></div>
      </div>
    </footer>
  );
};

export default Footer;