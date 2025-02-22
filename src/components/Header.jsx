import React from "react";
import logo from "../assets/logo2.svg";

const Header = () => {
  return (
    <div className="flex justify-between p-4 text-base items-center">
      <div className="flex items-center text-2xl">
        <img src={logo} alt="Logo" className="size-12" />
        <span className="font-semibold">NUTCHA BITES</span>
      </div>
      <div>
        <button className="px-4 py-2 font-semibold bg-[var(--color-accent)]/80 text-[var(--color-primary)] hover:scale-105 transition-all duration-500 hover:bg-[var(--color-accent)]/90">
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default Header;
