import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-primary)]  py-1 text-center">
      <p>©{currentYear} John Lester Escarlan | All Rights Reserved </p>
    </footer>
  );
};

export default Footer;
