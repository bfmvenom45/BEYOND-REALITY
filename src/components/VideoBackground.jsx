import React, { useRef, useEffect } from 'react'
import '../styles/VideoBackground.css'

const VideoBackground = ({ className = '' }) => {
  const videoRef = useRef()

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Ensure video plays on load
      video.muted = true
      video.play().catch(console.error)
      
      // Add scroll-based effects
      const handleScroll = () => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        if (video) {
          video.style.transform = `translateY(${rate}px)`
        }
      }

      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className={`video-background ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/video/poster.png"
        className="background-video"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
      <div className="cinematic-bars">
        <div className="bar bar-top"></div>
        <div className="bar bar-bottom"></div>
      </div>
    </div>
  )
}

export default VideoBackground