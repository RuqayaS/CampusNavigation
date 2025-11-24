import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Hero section fade in animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    // Section title animation on scroll
    gsap.fromTo(
      sectionTitleRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Building cards stagger animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home-page">
      {/* Header with logo */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef}>Campus Navigation</h1>
            <p ref={subtitleRef}>
              Campus Navigation is a web-based application that helps students,
              faculty, and staff easily locate rooms, classrooms, lecture halls,
              and faculty offices across the university. It also displays
              real-time room availability using data from the class schedule.
            </p>
          </div>
          <div className="hero-image">
            <img src="/main-building.jpg" alt="Campus Building" />
          </div>
        </div>
      </section>

      {/* General Information Section */}
      <section className="general-info">
        <h2 ref={sectionTitleRef}>General Information</h2>
        <div className="building-cards">
          {/* Main Building */}
          <div
            className="building-card building-main"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <div>
              <h3>Main Building</h3>
              <p>
                The central hub of the university housing administrative
                offices, student services, and academic departments.
              </p>
            </div>
            <img src="/main-building.jpg" alt="Main Building" />
          </div>

          {/* Library & Gym */}
          <div
            className="building-card building-library"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <div>
              <h3>Library & Gym</h3>
              <p>
                A facility combining a comprehensive library with study spaces
                and a modern gymnasium for student wellness.
              </p>
            </div>
            <img src="/library-gym.jpg" alt="Library & Gym" />
          </div>

          {/* Tuwaiq Building */}
          <div
            className="building-card building-tuwaiq"
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <div>
              <h3>Tuwaiq Building</h3>
              <p>
                Dedicated to technology and innovation with state-of-the-art
                computer labs and collaborative workspaces.
              </p>
            </div>
            <img src="/tuwaiq.jpg" alt="Tuwaiq Building" />
          </div>

          {/* Najd Building */}
          <div
            className="building-card building-najd"
            ref={(el) => (cardsRef.current[3] = el)}
          >
            <div>
              <h3>Najd Building</h3>
              <p>
                Houses lecture halls and classrooms equipped with modern
                audiovisual equipment for engaging learning experiences.
              </p>
            </div>
            <img src="/Najf.jpg" alt="Najd Building" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
