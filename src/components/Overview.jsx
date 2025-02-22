import React from "react";
import Typewriter from "typewriter-effect";
import nutchaBites from "../assets/nutchaOverview.webp";

const Overview = () => {
  return (
    <section
      aria-label="Overview Section"
      className="mt-12 sm:mt-16 md:mt-32 max-w-6xl mx-auto px-4 py-12 transition-all duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={nutchaBites} // Ensure your actual image path is correct
            alt="Delicious Nutcha Bites showcasing a modern twist on traditional flavors"
            loading="lazy"
            className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Benefits Section */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-secondary, #4A5568)]/80">
            When Tradition Meets{" "}
            <span aria-live="polite">
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
            </span>
          </h2>

          <ul className="space-y-2 text-base sm:text-lg text-[var(--color-secondary, #4A5568)]/70">
            {[
              "Irresistibly crunchy texture",
              "Unique fusion of matcha and muscovado flavors",
              "Honors rich cultural heritage with a modern twist",
            ].map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-center transition-colors duration-300 hover:text-[var(--color-accent, #F56565)]/80"
              >
                <span className="mr-2 text-[var(--color-accent, #F56565)]/60 text-lg sm:text-xl">
                  ✅
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Overview;
