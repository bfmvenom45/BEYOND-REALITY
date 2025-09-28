import React, { useRef, useEffect } from 'react'

const OptimizedVideoBackground = ({ src, className = '', ...props }) => {
  const videoRef = useRef()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Optimize video playback
    video.muted = true
    video.loop = true
    video.playsInline = true
    
    // Auto play when component mounts
    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.log('Video autoplay failed:', error)
      }
    }

    playVideo()

    return () => {
      if (video) {
        video.pause()
      }
    }
  }, [])

  return (
    <div className={`video-background ${className}`}>
      <video 
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        {...props}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default OptimizedVideoBackground
