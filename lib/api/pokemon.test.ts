import { faker } from "@faker-js/faker";
import type { Pokemon } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import prisma from "@/lib/prisma";

import * as pokemonApi from "./pokemon";

let testPokemon: Pokemon;

beforeEach(async () => {
  testPokemon = await prisma.pokemon.create({
    data: { name: "Test", imageUrl: faker.image.url() },
  });
});

afterEach(async () => {
  await prisma.pokemon.deleteMany();
});

describe("Get all", () => {
  it("Returns all pokemon", async () => {
    const { data: pokemon, pagination } = await pokemonApi.getAll({
      page: 1,
      limit: 10,
    });

    expect(pagination.count).toBe(1);
    expect(pagination.pages).toBe(1);
    expect(pokemon).toHaveLength(1);
  });
});

describe("Get one", () => {
  it("Returns a single pokemon", async () => {
    const result = await pokemonApi.getOne(testPokemon.id);

    expect(result?.name).toEqual(testPokemon.name);
  });
});
