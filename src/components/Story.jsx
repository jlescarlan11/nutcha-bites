import React from "react";
import backgroundImage from "../assets/nutchaBackground.webp";

const Story = () => {
  return (
    <section
      id="our-vision"
      aria-label="Our Story section with background image"
      className="mt-32 relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for improved readability with a subtle backdrop blur */}
      <div className="absolute inset-0 bg-[var(--color-secondary)]/50 backdrop-blur-sm transition-opacity duration-500" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Our Vision
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          Nutcha Bites is a fusion of Filipino tradition and Japanese
          innovation. Born from a passion for culinary artistry, we blend the
          rich heritage of Filipino bandi with the vibrant, earthy notes of
          matcha to create a snack that tells a story in every bite.
        </p>
        <figure className="max-w-xl mx-auto">
          <blockquote className="text-white italic border-l-4 pl-4 border-green-500">
            "Nutcha Bites bring together the soul of Filipino flavors and the
            spirit of Japanese matcha. Every bite is a journey through tradition
            and modern taste."
          </blockquote>
          <figcaption className="text-green-300 mt-4">
            - A Satisfied Customer
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Story;
