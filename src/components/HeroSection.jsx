import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ParticleCanvas from './ParticleCanvas'
import '../styles/HeroSection.css'

const HeroSection = () => {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const particlesRef = useRef()
  const backgroundRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Enhanced title animation with split text effect
    tl.fromTo(titleRef.current,
      { 
        y: 100, 
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -100px"
      },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.5, 
        ease: "power3.out" 
      }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    )

    // Floating animation for background
    gsap.to(backgroundRef.current, {
      y: -20,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    })

    // Create floating particles
    const cleanupParticles = createParticles()

    return () => {
      if (cleanupParticles) cleanupParticles()
    }
  }, [])

  const createParticles = () => {
    const animations = []
    const container = particlesRef.current
    if (!container) return

    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 4 + 's'
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's'
      
  container.appendChild(particle)
      
      // GSAP animation for each particle
      const animation = gsap.to(particle, {
        y: Math.random() * 200 - 100,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 4 + 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2
      })
      animations.push(animation)
    }

    return () => {
      animations.forEach(animation => animation?.kill())
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-content container">
        <div className="title-container">
          <h1 ref={titleRef} className="hero-title">
            <span className="title-word" data-text="PIXEL">PIXEL</span>
            <span className="title-word" data-text="UNIVERSE">UNIVERSE</span>
          </h1>
        </div>
        <p ref={subtitleRef} className="hero-subtitle">
          Transcend boundaries. Embrace the infinite possibilities of tomorrow.
        </p>
        <div className="hero-actions">
          <a className="cta-button primary" href="#technology">Enter the Future</a>
          <a className="cta-button secondary" href="#about">Discover More</a>
        </div>
      </div>
      
      <div className="hero-background">
        <div ref={backgroundRef} className="animated-background"></div>
        <ParticleCanvas />
        <div ref={particlesRef} className="particles-container"></div>
        <div className="gradient-overlay"></div>
        <div className="noise-texture"></div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-text">SCROLL TO EXPLORE</div>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default HeroSection