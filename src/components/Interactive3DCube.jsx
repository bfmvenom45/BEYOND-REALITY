import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/Interactive3DCube.css'

const Interactive3DCube = () => {
  const cubeRef = useRef()
  const containerRef = useRef()
  const mousePosition = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const cube = cubeRef.current
    const container = containerRef.current
    
    if (!cube || !container) return

    // Auto rotation when not hovering
    const autoRotate = () => {
      if (!isHovering.current) {
        gsap.to(cube, {
          rotationY: "+=360",
          duration: 10,
          ease: "none",
          repeat: -1
        })
      }
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mousePosition.current.x = (e.clientX - centerX) / (rect.width / 2)
      mousePosition.current.y = (e.clientY - centerY) / (rect.height / 2)

      if (isHovering.current) {
        const rotationY = mousePosition.current.x * 45
        const rotationX = -mousePosition.current.y * 45

        gsap.to(cube, {
          rotationY: rotationY,
          rotationX: rotationX,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    const handleMouseEnter = () => {
      isHovering.current = true
      gsap.killTweensOf(cube)
      
      gsap.to(cube, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      isHovering.current = false
      
      gsap.to(cube, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: autoRotate
      })
    }

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Start auto rotation
    autoRotate()

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(cube)
    }
  }, [])

  return (
    <div ref={containerRef} className="cube-container">
      <div ref={cubeRef} className="cube">
        <div className="cube-face front">
          <div className="face-content">
            <span className="tech-icon">🚀</span>
            <span className="tech-label">Innovation</span>
          </div>
        </div>
        <div className="cube-face back">
          <div className="face-content">
            <span className="tech-icon">🧠</span>
            <span className="tech-label">AI</span>
          </div>
        </div>
        <div className="cube-face right">
          <div className="face-content">
            <span className="tech-icon">⚡</span>
            <span className="tech-label">Speed</span>
          </div>
        </div>
        <div className="cube-face left">
          <div className="face-content">
            <span className="tech-icon">🌐</span>
            <span className="tech-label">Global</span>
          </div>
        </div>
        <div className="cube-face top">
          <div className="face-content">
            <span className="tech-icon">∞</span>
            <span className="tech-label">Infinite</span>
          </div>
        </div>
        <div className="cube-face bottom">
          <div className="face-content">
            <span className="tech-icon">🔮</span>
            <span className="tech-label">Future</span>
          </div>
        </div>
      </div>
      
      {/* Holographic effects */}
      <div className="holographic-ring ring-1"></div>
      <div className="holographic-ring ring-2"></div>
      <div className="holographic-ring ring-3"></div>
    </div>
  )
}

export default Interactive3DCube
