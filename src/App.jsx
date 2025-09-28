import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import './styles/App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    gsap.config({ force3D: true })
    
    // Global scroll animations
    gsap.utils.toArray('.fade-in').forEach(element => {
      gsap.fromTo(element, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AboutSection />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App