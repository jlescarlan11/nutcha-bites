// Ingredient.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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

const IngredientRow = ({ ingredient, onSelect }) => {
  const { name, description, optional } = ingredient;
  return (
    <tr
      onClick={() => onSelect(ingredient)}
      className="hover:bg-[var(--color-secondary)]/10 transition-colors duration-200 cursor-pointer"
    >
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
  onSelect: PropTypes.func.isRequired,
};

const IngredientCard = ({ ingredient, onSelect }) => {
  const { name, description, optional } = ingredient;
  return (
    <div
      onClick={() => onSelect(ingredient)}
      className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 mb-4 transition-transform duration-200 transform hover:scale-105 cursor-pointer"
    >
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
  onSelect: PropTypes.func.isRequired,
};

const Ingredients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteToggle = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="ingredients"
      className="mt-20 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--color-secondary)]/80 mb-6">
          Ingredients
        </h2>
        <p className="text-center text-[var(--color-secondary)]/60 mb-8">
          We believe in authenticity and transparency. Here’s exactly what goes
          into every bite of Nutcha Bites:
        </p>
        <div className="mb-6 flex items-center justify-center space-x-2">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-2 border rounded focus:outline-none focus:ring focus:border-[var(--color-secondary)] transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-3 py-2 border rounded text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition"
            >
              Clear
            </button>
          )}
        </div>
        {filteredIngredients.length === 0 ? (
          <p className="text-center text-[var(--color-secondary)]/70">
            No ingredients found.
          </p>
        ) : (
          <>
            {/* Desktop/Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full w-full border-collapse transition-all duration-300">
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
                    <IngredientRow
                      key={item.id}
                      ingredient={item}
                      onSelect={setSelectedIngredient}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile/Card View */}
            <div className="block sm:hidden">
              {filteredIngredients.map((item) => (
                <IngredientCard
                  key={item.id}
                  ingredient={item}
                  onSelect={setSelectedIngredient}
                />
              ))}
            </div>
          </>
        )}
        <div className="mt-8 text-center">
          <p className="text-[var(--color-secondary)]/70 italic">
            Our expert process transforms these high-quality ingredients into
            the perfect, crunchy, and innovative Nutcha Bites.
          </p>
        </div>
      </div>

      {/* Ingredient Details Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedIngredient(null)}
          ></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 mx-4 z-50 transition-transform duration-300 transform animate-modalIn">
            <button
              onClick={() => setSelectedIngredient(null)}
              className="absolute top-3 right-3 text-2xl text-[var(--color-secondary)] hover:text-[var(--color-accent)] focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {selectedIngredient.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedIngredient.description}
            </p>
            {selectedIngredient.optional && (
              <p className="text-sm text-gray-500 italic mb-4">
                This ingredient is optional.
              </p>
            )}
            <button
              onClick={() => handleFavoriteToggle(selectedIngredient.id)}
              className="flex items-center justify-center w-full px-4 py-2 border rounded-full text-sm font-medium transition-colors duration-300 hover:bg-[var(--color-accent)]/10"
            >
              {favoriteIds.includes(selectedIngredient.id) ? (
                <>
                  <FaHeart className="mr-2 text-[var(--color-accent)]" />{" "}
                  Favorited
                </>
              ) : (
                <>
                  <FaRegHeart className="mr-2" /> Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modalIn {
          animation: modalIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Ingredients;
