"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface GetAllArgs {
  page: number;
  limit: number;
}

export async function getAll({ page, limit }: GetAllArgs) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const [count, pokemon] = await Promise.all([
    prisma.pokemon.count(),
    prisma.pokemon.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: "asc" },
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
        likes: { where: { userId }, select: { id: true } },
      },
    }),
  ]);

  return {
    data: pokemon.map(({ likes, types, ...rest }) => ({
      ...rest,
      isLiked: !!likes.length,
      types: types.map(({ type }) => ({ ...type })),
    })),
    pagination: { count, pages: Math.ceil(count / limit) },
  };
}

export async function getList() {
  return prisma.pokemon.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function getOne(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const pokemon = await prisma.pokemon.findUnique({
    where: { id },
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
      likes: { where: { userId }, select: { id: true } },
      collections: {
        where: { collection: { userId } },
        select: { collection: { select: { id: true, name: true } } },
      },
    },
  });

  if (!pokemon) {
    return null;
  }

  const { likes, types, collections, ...rest } = pokemon;

  return {
    ...rest,
    isLiked: !!likes.length,
    types: types.map(({ type }) => ({ ...type })),
    collections: collections.map(({ collection }) => ({ ...collection })),
  };
}

export async function like(pokemonId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const like = await prisma.like.upsert({
    where: { pokemonId_userId: { pokemonId, userId } },
    update: {},
    create: { pokemonId, userId },
  });

  revalidatePath("/");
  revalidatePath(`/pokemon/${pokemonId}`);

  return like;
}

export async function unlike(pokemonId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const like = await prisma.like.delete({
    where: { pokemonId_userId: { pokemonId, userId } },
  });

  revalidatePath("/");

  return like;
}
