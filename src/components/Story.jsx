import React from "react";
import backgroundImage from "../assets/nutchaBackground.webp";
import { useNavigate } from "react-router-dom";

const Story = () => {
  return (
    <section
      id="our-vision"
      aria-label="Our Story section with background image"
      className="relative mt-24 bg-cover bg-center bg-scroll md:bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Enhanced overlay with gradient for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.7)] backdrop-blur-sm transition-opacity duration-500" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-24 text-center animate-fadeIn">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-[var(--color-primary)] mb-4 sm:mb-6">
          Our Vision
        </h2>
        <p className="text-base sm:text-lg md:text-2xl text-white/95 dark:text-[var(--color-primary)]/95 mb-6 sm:mb-8">
          Nutcha Bites is a fusion of Filipino tradition and Japanese
          innovation. Born from a passion for culinary artistry, we blend the
          rich heritage of Filipino bandi with the vibrant, earthy notes of
          matcha to create a snack that tells a story in every bite.
        </p>
        <figure className="max-w-xl mx-auto mb-8">
          <blockquote className="text-white/80 italic border-l-4 pl-4 border-green-500">
            "Nutcha Bites bring together the soul of Filipino flavors and the
            spirit of Japanese matcha. Every bite is a journey through tradition
            and modern taste."
          </blockquote>
          <figcaption className="text-green-300 mt-4">
            - A Satisfied Customer
          </figcaption>
        </figure>
        <a
          className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Learn more about Nutcha Bites"
          href="#contact-us"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Story;
