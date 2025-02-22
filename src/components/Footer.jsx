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
    <footer className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-primary)] py-4 px-4 text-center">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <p className="text-xs sm:text-sm md:text-base mb-2">
          © {currentYear} John Lester Escarlan | All Rights Reserved
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-xl sm:text-2xl hover:scale-110 transition-transform duration-200"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
