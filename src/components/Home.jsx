// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4">
      <div className="mt-28 text-center">
        {/* Responsive typography: smaller on mobile, larger on desktop */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold">
          Nutcha Bites
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light mt-4">
          Old-School Crunch, New-School Vibes. A Nutchalicious Bite!
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/order")}
            className="px-6 py-3 font-semibold text-lg sm:text-xl transition-all duration-500 ease-in-out hover:bg-[var(--color-accent)]/90 hover:scale-105 bg-[var(--color-accent)]/80 text-[var(--color-primary)] rounded"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
