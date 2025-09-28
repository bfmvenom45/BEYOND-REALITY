import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '∞', label: 'Immersive universes' },
  { value: '92%', label: 'Neural accuracy' },
  { value: '0.8s', label: 'Adaptive response' }
]

// Додаємо контент для різних табів
const tabsContent = [
  {
    id: 'design',
    title: 'Digital Design',
    description: 'Creating pixel-perfect interfaces that blur the line between art and functionality. Every element crafted with precision and purpose.',
    stats: [
      { value: '150+', label: 'Projects completed' },
      { value: '99%', label: 'Client satisfaction' },
      { value: '24/7', label: 'Creative process' }
    ]
  },
  {
    id: 'development',
    title: 'Code Architecture', 
    description: 'Building robust, scalable applications with modern technologies. Clean code meets innovative solutions in every line we write.',
    stats: [
      { value: '500K+', label: 'Lines of code' },
      { value: '95%', label: 'Performance score' },
      { value: '0.2s', label: 'Load time' }
    ]
  },
  {
    id: 'innovation',
    title: 'Future Tech',
    description: 'Exploring cutting-edge technologies and pushing boundaries. From AI integration to immersive experiences, we shape tomorrow.',
    stats: [
      { value: '∞', label: 'Possibilities' },
      { value: '100%', label: 'Innovation focus' },
      { value: '3D', label: 'Experiences' }
    ]
  }
]

const AboutSection = () => {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const contentRef = useRef(null)

  const handleTabChange = (index) => {
    if (index === activeTab) return

    const content = contentRef.current
    const hologram = sectionRef.current?.querySelector('.holographic-display')
    
    if (!content) return

    // Додаємо клас для анімації
    content.classList.add('changing')
    
    // Міняємо клас голограми для зміни кольору
    if (hologram) {
      hologram.className = `holographic-display tab-${index}`
    }

    // Анімація зміни контенту
    gsap.to(content, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setActiveTab(index)
        content.classList.remove('changing')
        gsap.fromTo(content,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            ease: 'power2.out',
            onComplete: () => {
              // Анімація статистик
              gsap.fromTo(content.querySelectorAll('.stat-item'),
                { scale: 0.8, opacity: 0 },
                { 
                  scale: 1, 
                  opacity: 1, 
                  duration: 0.5,
                  stagger: 0.1,
                  ease: 'back.out(1.7)'
                }
              )
            }
          }
        )
      }
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%'
          }
        }
      )

      gsap.to(section.querySelectorAll('.holo-ring'), {
        rotateZ: (i) => (i % 2 === 0 ? 360 : -360),
        duration: (i) => 20 + i * 5,
        ease: 'none',
        repeat: -1
      })

      // Додаткова анімація для кілець при наведенні на dots
      section.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('mouseenter', () => {
          gsap.to(section.querySelectorAll('.holo-ring'), {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        
        dot.addEventListener('mouseleave', () => {
          gsap.to(section.querySelectorAll('.holo-ring'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })

      gsap.to(section.querySelectorAll('.data-point'), {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        opacity: 'random(0.4, 1)',
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true
        }
      })

      ScrollTrigger.batch(section.querySelectorAll('.stat-item'), {
        start: 'top 70%',
        interval: 0.2,
        batchMax: 2,
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.1
            })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const currentContent = tabsContent[activeTab]

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="section-background" aria-hidden="true">
        <div className="bg-grid"></div>
        <div className="bg-particles"></div>
      </div>

      <div className="container about-grid">
        <div className="about-content" ref={contentRef}>
          <span className="section-tag">About the Lab</span>
          <h2 className="section-title">{currentContent.title}</h2>
          <p className="section-description">
            {currentContent.description}
          </p>

          <div className="stats-container">
            {currentContent.stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hologram-container" aria-hidden="true">
          <div className={`holographic-display tab-${activeTab}`}>
            <div className="holo-ring ring-1"></div>
            <div className="holo-ring ring-2"></div>
            <div className="holo-ring ring-3"></div>
            <div className="energy-core">
              <div className="core-inner"></div>
            </div>

            <div className="data-streams">
              <div className="data-stream stream-1">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={`stream1-${index}`} className="data-point"></div>
                ))}
              </div>
              <div className="data-stream stream-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={`stream2-${index}`} className="data-point"></div>
                ))}
              </div>
              <div className="data-stream stream-3">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={`stream3-${index}`} className="data-point"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="holo-interface">
            <div className="interface-line"></div>
            <div className="interface-dots">
              {tabsContent.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`dot ${activeTab === index ? 'active' : ''}`}
                  onClick={() => handleTabChange(index)}
                  aria-label={`Switch to ${tab.title}`}
                >
                  <span className="dot-tooltip">{tab.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
