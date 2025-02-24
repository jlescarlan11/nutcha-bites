// App.jsx
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Overview from "./components/Overview";
import OrderForm from "./components/OrderForm";
import background from "./assets/nutchaBackground.webp";
import StickyNav from "./components/StickyNav";
import Ingredients from "./components/Ingredient";
import Story from "./components/Story";
import Testimonials from "./components/Testimonials";
import FAQS from "./components/FAQS";
import NewsletterSignup from "./components/NewsletterSignup";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTopButton from "./components/BackToTopButton"; // New cool feature!

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [navVisible, setNavVisible] = useState(false);

  // Toggle sticky nav visibility after a scroll threshold
  useEffect(() => {
    const handleNavVisibility = () => {
      setNavVisible(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleNavVisibility);
    return () => window.removeEventListener("scroll", handleNavVisibility);
  }, []);

  // Scroll spy: update activeSection based on current scroll position
  useEffect(() => {
    const sectionIds = [
      "overview",
      "recipe",
      "our-vision",
      "testimonials",
      "faqs",
      "contact-us",
    ];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY;
      let currentSection = "";
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          if (section.offsetTop <= scrollPos + window.innerHeight / 3) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy);
    // Initial check
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <Router>
      <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
        <div className="min-h-screen flex flex-col relative">
          <ScrollProgress />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header className="relative">
                    <div
                      className="min-h-screen bg-cover bg-center bg-fixed"
                      style={{ backgroundImage: `url(${background})` }}
                    >
                      {/* Enhanced overlay with gradient, blur, and parallax effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-secondary)]/40 to-[var(--color-secondary)]/80 backdrop-blur-md" />
                      <div className="relative z-10 text-[var(--color-primary)]">
                        <Header />
                        <Home />
                      </div>
                    </div>
                  </header>
                  <StickyNav
                    activeSection={activeSection}
                    visible={navVisible}
                  />
                  <main className="bg-[var(--color-primary)] flex flex-col flex-grow">
                    <section id="overview">
                      <Overview />
                    </section>
                    <section id="recipe">
                      <Ingredients />
                    </section>
                    <section id="our-vision">
                      <Story />
                    </section>
                    <section id="testimonials">
                      <Testimonials />
                    </section>
                    <section id="faqs">
                      <FAQS />
                    </section>
                    <section id="contact-us">
                      <NewsletterSignup />
                    </section>
                    <section id="footer">
                      <Footer />
                    </section>
                  </main>
                  <BackToTopButton /> {/* New feature */}
                </>
              }
            />
            <Route path="/order" element={<OrderForm />} />
          </Routes>
        </div>
      </MobileMenuContext.Provider>
    </Router>
  );
};

export default App;
