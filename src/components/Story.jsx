import React, { useState, useEffect, useRef, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import backgroundImage from "../assets/nutchaOverview.webp";

// ParallaxLayer component for the background
const ParallaxLayer = ({ offset, speed, image, children, className = "" }) => {
  const layerStyle = {
    transform: `translate3d(0, ${offset * speed}px, 0)`,
    willChange: "transform",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
  };

  return (
    <div className={className} style={layerStyle}>
      {image && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.35)",
            }}
          />
        </>
      )}
      {children}
    </div>
  );
};

const Modal = React.lazy(() => import("./Modal"));

const Story = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (sectionRef.current && !ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          setOffset(rect.top);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-vision"
      aria-label="Our Story section with advanced parallax effect"
      className="relative overflow-hidden"
      style={{ height: "100vh" }}
    >
      <ParallaxLayer offset={offset} speed={0.5} image={backgroundImage} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-12 pt-32 text-center animate-fadeIn">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)]/90 mb-4 sm:mb-6">
          Our Vision
        </h2>
        <p className="text-base sm:text-lg md:text-2xl text-[var(--color-primary)]/80 mb-6 sm:mb-8">
          Nutcha Bites is a fusion of Filipino tradition and Japanese
          innovation. Born from a passion for culinary artistry, we blend the
          rich heritage of Filipino bandi with the vibrant, earthy notes of
          matcha to create a snack that tells our story with authenticity and
          excellence.
        </p>
        <figure className="max-w-xl mx-auto mb-8">
          <blockquote className="text-[var(--color-primary)]/70 italic border-l-4 pl-4 border-green-500">
            "Nutcha Bites bring together the soul of Filipino flavors and the
            spirit of Japanese matcha. Every bite is a journey through tradition
            and modern taste."
          </blockquote>
          <figcaption className="text-green-300 mt-4">
            - A Satisfied Customer
          </figcaption>
        </figure>
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate("/order")}
            className="px-6 py-3 bg-[var(--color-accent)]/50 text-[var(--color-primary)] rounded-full hover:bg-[var(--color-accent)]/60 transition-transform duration-300 focus:outline-none transform hover:scale-105"
          >
            Order Now
          </button>
          <CSSTransition
            in={showModal}
            timeout={300}
            classNames="modal-transition"
            unmountOnExit
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Modal onClose={() => setShowModal(false)} />
            </Suspense>
          </CSSTransition>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-[var(--color-primary)]/90 text-[var(--color-accent)]/50 rounded-full hover:bg-[var(--color-primary)] transition-transform duration-300 focus:outline-none transform hover:scale-105"
          >
            Read More
          </button>
        </div>
      </div>

      <style>{`
        :root {
          --color-primary: hsla(33, 50%, 90%);
          --color-secondary: hsl(33, 50%, 10%);
          --color-secondary-90: hsla(33, 50%, 10%, 0.9);
          --color-secondary-80: hsla(33, 50%, 10%, 0.8);
          --color-secondary-70: hsla(33, 50%, 10%, 0.7);
          --color-secondary-60: hsla(33, 50%, 10%, 0.6);
          --color-tertiary: hsl(333, 80%, 20%);
          --color-accent: hsl(93, 80%, 20%);
          --color-accent-90: hsla(93, 80%, 20%, 0.9);
          --color-accent-80: hsla(93, 80%, 20%, 0.8);
          --color-accent-70: hsla(93, 80%, 20%, 0.7);
          --color-accent-60: hsla(93, 80%, 20%, 0.6);
          --color-accent-50: hsla(93, 80%, 20%, 0.5);
          --color-accent-40: hsla(93, 80%, 20%, 0.4);
          --color-accent-30: hsla(93, 80%, 20%, 0.3);
          --color-accent-20: hsla(93, 80%, 20%, 0.2);
          --color-accent-10: hsla(93, 80%, 20%, 0.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        .modal-transition-enter {
          opacity: 0;
          transform: scale(0.95);
        }
        .modal-transition-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms, transform 300ms;
        }
        .modal-transition-exit {
          opacity: 1;
          transform: scale(1);
        }
        .modal-transition-exit-active {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
    </section>
  );
};

export default Story;
