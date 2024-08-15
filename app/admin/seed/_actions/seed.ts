"use server";

import prisma from "@/lib/prisma";

import { originalPokemon, typesToEmojiMap } from "./data";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function seedPokemonData() {
  for (const pokemon of originalPokemon) {
    const pokemonApiData = await fetch(`${BASE_URL}/${pokemon.toLowerCase()}`);

    const response = await pokemonApiData.json();

    const dbPokemon = await prisma.pokemon.create({
      data: {
        name: response.name,
        imageUrl: response.sprites.front_default,
      },
    });

    for (const [idx, type] of response.types.entries()) {
      await prisma.pokemonTypeOnPokemon.create({
        data: {
          slot: idx + 1,
          pokemon: { connect: { id: dbPokemon.id } },
          type: {
            connectOrCreate: {
              where: { name: type.type.name },
              create: {
                name: type.type.name,
                // @ts-ignore
                icon: typesToEmojiMap[type.type.name],
              },
            },
          },
        },
      });
    }
  }
}
