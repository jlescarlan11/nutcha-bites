// App.jsx
import React, { createContext } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Overview from "./components/Overview";
// import Recipe from "./components/Recipe"; // Create similar components as needed
// import OurStory from "./components/OurStory";
// import PackagingAndBranding from "./components/PackagingAndBranding";
// import Testimonials from "./components/Testimonials";
// import FAQs from "./components/FAQs";
// import ContactUs from "./components/ContactUs";

export const MobileMenuContext = createContext();

const App = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <div className="bg-[var(--color-primary)] flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {/* Each section has an id for in-page navigation */}
          <section id="home">
            <Home />
          </section>
          <section id="overview" className="mt-24">
            <Overview />
          </section>
          {/* <section id="recipe">
            <Recipe />
          </section>
          <section id="our-story">
            <OurStory />
          </section>
          <section id="packaging-and-branding">
            <PackagingAndBranding />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section id="faqs">
            <FAQs />
          </section>
          <section id="contact-us">
            <ContactUs />
          </section> */}
        </main>
      </div>
    </MobileMenuContext.Provider>
  );
};

export default App;
