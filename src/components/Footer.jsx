// Footer.jsx
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/johnlester.escarlan11",
      name: "Facebook",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/jlescarlan11",
      name: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/john-lester-escarlan-3a23072a6/",
      name: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-primary)] py-4 px-4 text-center relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] animate-pulse"></div>
      <div className="max-w-screen-lg mx-auto flex flex-col items-center pt-4">
        <p className="text-xs sm:text-sm md:text-base mb-2">
          © {currentYear} John Lester Escarlan | All Rights Reserved
        </p>
        <div className="flex space-x-4 mb-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-xl sm:text-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-6"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-2 text-xs sm:text-sm text-[var(--color-primary)] border border-[var(--color-primary)] rounded px-2 py-1 hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-300 md:hidden shadow-sm hover:shadow-md"
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
