import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Overview from "./components/Overview";
import OrderForm from "./components/OrderForm";
import background from "./assets/nutchaBackground.webp";
import StickyNav2 from "./components/StickyNav2";
import Ingredients from "./components/Ingredient";
import Story from "./components/Story";
import Testimonials from "./components/Testimonials";
import FAQS from "./components/FAQS";
import NewsletterSignup from "./components/NewsletterSignup";
import Footer from "./components/Footer";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header className="relative">
                    <div
                      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
                      style={{ backgroundImage: `url(${background})` }}
                    >
                      <div className="absolute inset-0 bg-[var(--color-secondary)]/50 backdrop-blur-sm" />
                      <div className="relative z-10 text-[var(--color-primary)]">
                        <Header />
                        <Home />
                      </div>
                    </div>
                  </header>
                  <StickyNav2
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
