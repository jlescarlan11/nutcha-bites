// Ingredients.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const ingredients = [
  {
    id: 1,
    name: "Raw Peanuts",
    description: "1 cup, lightly toasted and unsalted",
  },
  {
    id: 2,
    name: "Muscovado Sugar",
    description: "1/3 cup, for rich caramel notes",
  },
  {
    id: 3,
    name: "White Granulated Sugar",
    description: "1/6 cup, balancing the sweetness",
  },
  { id: 4, name: "Water", description: "2 tablespoons" },
  {
    id: 5,
    name: "Unsalted Butter",
    description: "1 tablespoon, for a smooth texture",
  },
  {
    id: 6,
    name: "Culinary-Grade Matcha Powder",
    description: "3/4 teaspoon, sifted",
  },
  { id: 7, name: "Fine Salt", description: "1/4 teaspoon, enhancing flavors" },
  {
    id: 8,
    name: "Baking Soda",
    description: "1/4 teaspoon, for a light crunch",
  },
  {
    id: 9,
    name: "Vanilla Extract",
    description: "1/8 teaspoon, for subtle aroma",
    optional: true,
  },
];

const IngredientRow = ({ ingredient }) => {
  const { name, description, optional } = ingredient;
  return (
    <tr className="hover:bg-[var(--color-secondary)]/10 transition-colors duration-200">
      <td className="px-4 py-2 border-b border-[var(--color-secondary)]/20 text-[var(--color-secondary)]/70">
        {name}{" "}
        {optional && (
          <span className="text-sm text-[var(--color-secondary)]/50">
            (Optional)
          </span>
        )}
      </td>
      <td className="px-4 py-2 border-b border-[var(--color-secondary)]/20 text-[var(--color-secondary)]/70">
        {description}
      </td>
    </tr>
  );
};

IngredientRow.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    optional: PropTypes.bool,
  }).isRequired,
};

const IngredientCard = ({ ingredient }) => {
  const { name, description, optional } = ingredient;
  return (
    <div className="bg-white rounded shadow p-4 mb-4 transition-transform duration-200 transform hover:scale-105">
      <h3 className="text-lg font-semibold text-[var(--color-secondary)]">
        {name}{" "}
        {optional && (
          <span className="text-sm text-[var(--color-secondary)]/50">
            (Optional)
          </span>
        )}
      </h3>
      <p className="text-[var(--color-secondary)]/70 mt-2">{description}</p>
    </div>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    optional: PropTypes.bool,
  }).isRequired,
};

const Ingredients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="ingredients" className="mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--color-secondary)]/80 mb-6">
          Ingredients
        </h2>
        <p className="text-center text-[var(--color-secondary)]/60 mb-8">
          We believe in authenticity and transparency. Here’s exactly what goes
          into every bite of Nutcha Bites:
        </p>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-[var(--color-secondary)] transition"
          />
        </div>
        {/* Desktop/Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full w-full border-collapse">
            <caption className="sr-only">
              List of ingredients for Nutcha Bites
            </caption>
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-[var(--color-secondary)]/30 text-left text-[var(--color-secondary)]/80 text-lg sm:text-xl">
                  Ingredient
                </th>
                <th className="px-4 py-2 border-b-2 border-[var(--color-secondary)]/30 text-left text-[var(--color-secondary)]/80 text-lg sm:text-xl">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map((item) => (
                <IngredientRow key={item.id} ingredient={item} />
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile/Card View */}
        <div className="block sm:hidden">
          {filteredIngredients.map((item) => (
            <IngredientCard key={item.id} ingredient={item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-[var(--color-secondary)]/70 italic">
            Our expert process transforms these high-quality ingredients into
            the perfect, crunchy, and innovative Nutcha Bites.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
