// Ingredients.test.jsx
import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Ingredients from "./Ingredients";

test("should have no accessibility violations", async () => {
  const { container } = render(<Ingredients />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
