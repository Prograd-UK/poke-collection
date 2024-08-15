"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getAll() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return prisma.collection.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      description: true,
      pokemon: { select: { id: true } },
    },
  });
}

export async function getList() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return prisma.collection.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function getOne(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const collection = await prisma.collection.findFirst({
    where: { id, userId },
    select: {
      id: true,
      name: true,
      description: true,
      pokemon: {
        select: {
          pokemon: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              types: {
                select: {
                  type: {
                    select: {
                      id: true,
                      name: true,
                      icon: true,
                    },
                  },
                },
              },
              likes: {
                where: { userId },
                select: { id: true },
              },
              collections: {
                where: { collection: { userId } },
                select: { id: true },
              },
              comments: {
                select: { id: true },
              },
            },
          },
        },
      },
    },
  });

  if (!collection) {
    return null;
  }

  return {
    ...collection,
    pokemon: collection.pokemon.map(
      ({ pokemon: { likes, types, collections, comments, ...rest } }) => ({
        ...rest,
        isLiked: !!likes.length,
        types: types.map(({ type }) => ({ ...type })),
        collectionsCount: collections.length,
        commentsCount: comments.length,
      })
    ),
  };
}

interface CreateInput {
  name: string;
  description?: string;
}

export async function create({ name, description }: CreateInput) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const collection = await prisma.collection.create({
    data: { name, description, userId },
  });

  revalidatePath("/collections");

  return collection;
}

interface AddPokemonInput {
  collectionId: string;
  pokemonId: string;
}

export async function addPokemon({ collectionId, pokemonId }: AddPokemonInput) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const collection = await prisma.collection.findFirst({
    where: { id: collectionId, userId },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  const collectionPokemon = await prisma.pokemonOnCollection.create({
    data: { collectionId, pokemonId },
  });

  revalidatePath(`/collections/${collectionId}`);
  revalidatePath("/collections");

  return collectionPokemon;
}
