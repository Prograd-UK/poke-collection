import { PokemonCard } from "./pokemon-card";
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";

it("Renders correctly", () => {
  const name = faker.animal.dog();
  const imageUrl = faker.image.url();

  render(
    <PokemonCard
      id={faker.string.uuid()}
      name={name}
      imageUrl={imageUrl}
      types={[]}
    />
  );

  expect(screen.getByRole("heading", { name })).toBeInTheDocument();
  expect(screen.getByRole("img", { name })).toBeInTheDocument();
});
