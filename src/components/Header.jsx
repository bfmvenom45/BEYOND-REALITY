import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/Header.css'

const Header = () => {
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      )

      const navItems = gsap.utils.toArray(header.querySelectorAll('.nav-links li'))
      if (navItems.length) {
        gsap.fromTo(navItems,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.4
          }
        )
      }
    }, header)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={headerRef} className="header">
      <nav className="nav container">
        <a className="logo" href="#home">
          <span className="logo-text">BUSHKO</span>
          <span className="logo-accent">∞ LAB</span>
        </a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header