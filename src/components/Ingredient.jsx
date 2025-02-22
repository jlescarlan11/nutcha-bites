// Ingredients.jsx
import React from "react";
import PropTypes from "prop-types";

// For scalability, this data can be moved to a separate file.
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
    <tr className="hover:bg-gray-100">
      <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
        {name}{" "}
        {optional && <span className="text-sm text-gray-500">(Optional)</span>}
      </td>
      <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
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

const Ingredients = () => {
  return (
    <section id="ingredients" className="mt-20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Ingredients
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We believe in authenticity and transparency. Here’s exactly what goes
          into every bite of Nutcha Bites:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <caption className="sr-only">
              List of ingredients for Nutcha Bites
            </caption>
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-gray-800 text-xl">
                  Ingredient
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-gray-800 text-xl">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item) => (
                <IngredientRow key={item.id} ingredient={item} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700 italic">
            Our expert process transforms these high-quality ingredients into
            the perfect, crunchy, and innovative Nutcha Bites.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
