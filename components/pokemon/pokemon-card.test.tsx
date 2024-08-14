import { PokemonCard } from "./pokemon-card";
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

it("Renders correctly", () => {
  const name = faker.animal.dog();
  const imageUrl = faker.image.url();

  render(<PokemonCard name={name} imageUrl={imageUrl} />);

  expect(screen.getByRole("heading", { name })).toBeInTheDocument();
  expect(screen.getByRole("img", { name })).toBeInTheDocument();
});
