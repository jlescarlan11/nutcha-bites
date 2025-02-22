import React, { useState } from "react";
import logo from "../assets/logo2.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Nutcha Bites Logo"
            className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 hover:scale-105"
          />
          <span className="ml-2 text-xl md:text-2xl font-semibold">
            NUTCHA BITES
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <button
                onClick={() => navigate("/order")}
                className="px-4 py-2 font-semibold bg-[var(--color-accent)]/80 text-[var(--color-primary)] hover:scale-105 transition-all duration-500 hover:bg-[var(--color-accent)]/90 focus:outline-none"
              >
                ORDER NOW
              </button>
            </li>
            {/* Additional nav items can be added here */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
