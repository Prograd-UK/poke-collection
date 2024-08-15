import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { PokemonCard } from "./pokemon-card";

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
