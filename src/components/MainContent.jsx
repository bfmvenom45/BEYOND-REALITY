import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/MainContent.css'

gsap.registerPlugin(ScrollTrigger)

const MainContent = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(section.querySelectorAll('.tech-card'))
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 120, opacity: 0, rotateX: 15, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%'
            }
          }
        )
      }

      const stats = gsap.utils.toArray(section.querySelectorAll('.stat-item'))
      if (stats.length) {
        gsap.fromTo(stats,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 60%'
            }
          }
        )
      }

      const timelineItems = gsap.utils.toArray(section.querySelectorAll('.timeline-item'))
      if (timelineItems.length) {
        gsap.fromTo(timelineItems,
          { xPercent: -10, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.25,
            scrollTrigger: {
              trigger: section,
              start: 'top 40%'
            }
          }
        )
      }

      gsap.utils.toArray(section.querySelectorAll('.parallax-element')).forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -150 : 150,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const techItems = [
    {
      title: 'Quantum Processing',
      description: 'Photonic pipelines channel massive datasets through quantum matrices in milliseconds.',
      icon: '⚛️'
    },
    {
      title: 'Neural Nexus',
      description: 'Adaptive neural fabrics sync with human intuition for hyper-personal experiences.',
      icon: '🧠'
    },
    {
      title: 'Holographic Interface',
      description: 'Volumetric UI layers react to gesture, voice and emotion in real time.',
      icon: '🌐'
    },
    {
      title: 'Singularity Core',
      description: 'Self-sustaining energy lattice delivering clean, limitless power to every module.',
      icon: '∞'
    }
  ]

  const statistics = [
    { value: '28', label: 'Global Labs' },
    { value: '312', label: 'Neural Patents' },
    { value: '4.8ms', label: 'Quantum Latency' }
  ]

  const timeline = [
    {
      title: '2024 · Neural Convergence',
      description: 'Launched the hybrid neural engine synchronising human insight with autonomous agents.'
    },
    {
      title: '2025 · Zero Point Grid',
      description: 'Deployed the first self-healing infrastructure across three continents with 99.999% uptime.'
    },
    {
      title: '2030 · Orbital Network',
      description: 'Building an orbital mesh that delivers real-time holographic collaboration anywhere on Earth.'
    }
  ]

  return (
    <main className="main-content">
      <section ref={sectionRef} className="tech-section" id="technology">
        <div className="parallax-element parallax-bg-1" aria-hidden="true"></div>
        <div className="parallax-element parallax-bg-2" aria-hidden="true"></div>

        <div className="container">
          <h2 className="section-title fade-in">Advanced Technology Lab</h2>
          <p className="section-subtitle fade-in">
            We orchestrate cinematic digital universes where code, sound and light flow in perfect harmony.
          </p>

          <div className="tech-grid">
            {techItems.map((item) => (
              <article key={item.title} className="tech-card">
                <div className="card-icon" aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="card-border" aria-hidden="true"></span>
                <div className="card-glow" aria-hidden="true"></div>
              </article>
            ))}
          </div>

          <div className="split-content">
            <div className="content-left">
              <p className="large-text">
                Every experience we craft is a living system — adaptive, cinematic and tuned to human emotion.
                Our teams combine volumetric design, spatial sound and neural orchestration to build realities that
                respond in microseconds.
              </p>
              <div className="stats-grid">
                {statistics.map((stat) => (
                  <div key={stat.label} className="stat-item">
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-right" aria-hidden="true">
              <div className="innovation-visual">
                <div className="rotating-element" style={{ animationDuration: '22s' }}></div>
                <div className="rotating-element" style={{ animationDuration: '30s', transformOrigin: 'center' }}></div>
                <div className="rotating-element" style={{ animationDuration: '18s' }}></div>
                <div className="floating-dots"></div>
              </div>
            </div>
          </div>

          <div className="timeline">
            {timeline.map((event) => (
              <div key={event.title} className="timeline-item">
                <span className="timeline-marker" aria-hidden="true"></span>
                <div className="timeline-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default MainContent
