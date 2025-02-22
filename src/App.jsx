// In App.jsx
import React, { createContext, useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Overview from "./components/Overview";
import background from "./assets/nutchaBackground.webp";
import StickyNav from "./components/StickyNav";
import StickyNav2 from "./components/StickyNav2";
import Ingredients from "./components/Ingredient";
import Story from "./components/Story";
import Testimonials from "./components/Testimonials";
import FAQS from "./components/FAQS";
import NewsletterSignup from "./components/NewsletterSignup";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Packaging & Branding",
  "Testimonials",
  "FAQs",
  "Contact Us",
];

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [navVisible, setNavVisible] = useState(false);

  // Intersection Observer for active section
  useEffect(() => {
    const sectionIds = menuItems.map((item) =>
      item.toLowerCase().replace(/\s+/g, "-")
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Scroll listener for fade-in effect
  useEffect(() => {
    const handleScroll = () => {
      // Change the threshold value (e.g., 100) to when you want the nav to fade in.
      if (window.scrollY > 700) {
        setNavVisible(true);
      } else {
        setNavVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <div className="min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="relative">
          <div
            className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="absolute inset-0 bg-[var(--color-secondary)]/50 backdrop-blur-sm" />
            <div className="relative z-10 text-[var(--color-primary)]">
              <Header />
              <section id="home">
                <Home />
              </section>
            </div>
          </div>
        </header>

        {/* Sticky Navigation with Active Highlight & Fade-in Effect */}

        <StickyNav2 activeSection={activeSection} visible={navVisible} />

        {/* Main Content */}
        <main className="bg-[var(--color-primary)] flex flex-col flex-grow">
          <section id="overview" className=" flex-grow">
            <Overview />
          </section>

          {/* Additional sections for demonstration */}
          <section id="recipe" className=" flex-grow">
            <div className="p-4 text-lg">
              <Ingredients />
            </div>
          </section>
          <section id="our-vision" className=" flex-grow">
            <div className="py-4 text-lg">
              <Story />
            </div>
          </section>
          <section id="testimonials" className="flex-grow">
            <div className="text-lg">
              <Testimonials />
            </div>
          </section>
          <section id="faqs" className="flex-grow">
            <div className="p-4 text-lg">
              <FAQS />
            </div>
          </section>
          <section id="contact-us" className="flex-grow">
            <div className=" text-lg">
              <NewsletterSignup />
            </div>
          </section>
        </main>
      </div>
    </MobileMenuContext.Provider>
  );
};

export default App;
