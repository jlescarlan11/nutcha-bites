// Overview.jsx
import React from "react";
import Typewriter from "typewriter-effect";
import nutchaBites from "../assets/nutchaOverview.webp";

const Overview = () => {
  return (
    <div className="mt-32 max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={nutchaBites} // Update with your actual image path
            alt="Nutcha Bites"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
        {/* Benefits Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            When Tradition Meets{" "}
            <Typewriter
              options={{
                strings: ["Innovation", "Modernization", "Transformation"],
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(1000)
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
            />
          </h2>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="mr-2 text-green-600 text-xl">✅</span>
              <span>Irresistibly crunchy texture</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-600 text-xl">✅</span>
              <span>Unique fusion of matcha and muscovado flavors</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-600 text-xl">✅</span>
              <span>Honors rich cultural heritage with a modern twist</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
