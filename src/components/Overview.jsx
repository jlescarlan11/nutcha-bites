import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import nutchaBites from "../assets/nutchaOverview.webp";

const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <section
      aria-label="Overview Section"
      className="mt-20 max-w-6xl mx-auto px-4 py-12 animate-fadeIn transition-all duration-500"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[var(--color-secondary)]/80 mb-6">
          Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={nutchaBites}
              alt="Delicious Nutcha Bites showcasing a modern twist on traditional flavors"
              loading="lazy"
              onClick={openModal}
              className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-2xl object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </div>
          {/* Benefits Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-secondary)]/80">
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

            <ul className="space-y-2 text-base sm:text-lg text-[var(--color-secondary)]/70 dark:text-[var(--color-secondary)]/80">
              {[
                "Irresistibly crunchy texture",
                "Unique fusion of matcha and muscovado flavors",
                "Honors rich cultural heritage with a modern twist",
              ].map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-center transition-colors duration-300 hover:text-[var(--color-accent)]/80"
                >
                  <span className="mr-2 text-[var(--color-accent)]/60 text-lg sm:text-xl">
                    ✅
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal for Enlarged Image */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
          >
            <div className="relative">
              <img
                src={nutchaBites}
                alt="Enlarged view of Nutcha Bites"
                className="max-w-full max-h-screen rounded-lg shadow-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 focus:outline-none"
                aria-label="Close image modal"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Overview;
