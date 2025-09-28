import React, { useRef, useEffect } from 'react'

const ParticleCanvas = () => {
  const canvasRef = useRef()
  const animationRef = useRef()
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    const setCanvasSize = () => {
      canvas.width = width = window.innerWidth
      canvas.height = height = window.innerHeight
    }

    setCanvasSize()

    // Particle class
    class Particle {
      constructor() {
        this.reset()
        this.y = Math.random() * height
      }

      reset() {
        this.x = Math.random() * width
        this.y = height + 20
        this.size = Math.random() * 3 + 1
        this.speedY = Math.random() * 1 + 0.5
        this.speedX = Math.random() * 0.4 - 0.2
        this.opacity = Math.random() * 0.8 + 0.2
        this.hue = Math.random() * 60 + 220 // Blue to purple range
        this.life = Math.random() * 5 + 3  
        this.decay = Math.random() * 0.001 + 0.0005  // дуже повільне згасання
      }

      update(mouseX, mouseY) {
        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 300) {
          const force = (200 - distance) / 100
          this.x -= dx * force * 0.02
          this.y -= dy * force * 0.02
        }

        this.y -= this.speedY
        this.x += this.speedX
        this.life -= this.decay

        // Wave motion
        this.x += Math.sin(this.y * 0.03) * 0.5

        if (this.y < -10 || this.life <= 0) {
          this.reset()
        }
      }

      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.opacity * this.life
        
        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 1)`)
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 60%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 4)
        ctx.fill()
        
        // Add glow effect
        ctx.shadowColor = `hsl(${this.hue}, 70%, 60%)`
        ctx.shadowBlur = this.size * 2
        ctx.fill()
        
        ctx.restore()
      }
    }

    // Connection lines between particles
    const drawConnections = (particles, ctx) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            const opacity = (60 - distance) / 80 * 0.3
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = '#6366f1'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      // Менше частинок на мобільних для кращої продуктивності
      const isMobile = window.innerWidth < 768
      const particleCount = isMobile ? 30 : 80 // Зменшено з 100
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y)
        particle.draw(ctx)
      })

      // Draw connections only on desktop for performance
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        drawConnections(particlesRef.current, ctx)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      e.preventDefault()
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY
      }
    }

    // Resize handler
    const handleResize = () => {
      setCanvasSize()
      initParticles()
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('resize', handleResize)

    initParticles()
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  )
}

export default ParticleCanvas