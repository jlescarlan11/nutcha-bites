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
          <button className="px-8 py-4 font-semibold text-2xl hover:opacity-70 transition duration-300 ease-in-out">
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
