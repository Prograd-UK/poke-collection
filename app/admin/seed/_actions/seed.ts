"use server";

import prisma from "@/lib/prisma";

import { originalPokemon, typesToEmojiMap } from "./data";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const checklistData = [
  {
    name: "Onboarding",
    steps: [
      { type: "email_verification", name: "Email Verification", description: "Verify your email address" },
      { type: "account_setup", name: "Account Setup", description: "Complete your account setup" }
    ]
  },
  {
    name: "Product Setup",
    steps: [
      { type: "product_selection", name: "Product Selection", description: "Select the product you want to set up" },
      { type: "configuration", name: "Configuration", description: "Configure your product settings" }
    ]
  }
];

export async function seedPokemonData () {
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

  const existingChecklists = await prisma.checklist.findMany();
  if (!existingChecklists.length) {
    for (const checklist of checklistData) {
      const createdChecklist = await prisma.checklist.create({
        data: {
          name: checklist.name,
          steps: {
            create: checklist.steps.map((step) => ({
              type: step.type,
              name: step.name,
              description: step.description
            }))
          },
        },
        include: { steps: true },
      });

      const userIds = ["userId1", "userId2"];
      for (const userId of userIds) {
        for (const step of createdChecklist.steps) {
          const existingCompletion = await prisma.userChecklistStepCompletion.findUnique({
            where: { id: `${userId}_${createdChecklist.id}` }
          });

          if (!existingCompletion) {
            await prisma.userChecklistStepCompletion.create({
              data: {
                userId: userId,
                checklistStepId: step.id,
                completed: false
              },
            });
          }
        }
      }
    }
  }
}
