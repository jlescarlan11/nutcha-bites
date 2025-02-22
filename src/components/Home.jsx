import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4">
      <div className="mt-28 text-center">
        <h1 className="text-8xl font-extrabold">Nutcha Bites</h1>
        <p className="text-xl font-light">
          Old-School Crunch, New-School Vibes. A Nutchalicious Bite!
        </p>
        <div className="mt-18">
          <button
            onClick={() => navigate("/order")}
            className="px-8 py-4 font-semibold text-2xl hover:bg-[var(--color-accent)]/90 ease-in-out hover:scale-105 transition-all duration-500 bg-[var(--color-accent)]/80 text-[var(--color-primary)]"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
