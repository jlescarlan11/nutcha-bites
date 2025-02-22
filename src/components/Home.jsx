import React from "react";
import StickyNav from "./StickyNav";

const Home = () => {
  return (
    <div className="flex flex-col items-center px-4">
      <div className="mt-28 text-center">
        <h1 className="text-8xl font-extrabold">Nutcha Bites</h1>
        <p className=" text-xl font-light block">
          Old-School Crunch, New-School Vibes. A Nutchalicious Bite!
        </p>
        <div className="mt-18">
          <button className="px-8 py-4 font-semibold text-2xl hover:bg-[var(--color-accent)]/90 ease-in-out hover:scale-105 transition-all duration-500 bg-[var(--color-accent)]/80 text-[var(--color-primary)]">
            Order Now
          </button>
        </div>
        <div className="mt-18">
          <StickyNav visible={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;
