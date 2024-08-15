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
        likes: { where: { userId: userId ?? undefined }, select: { id: true } },
      },
    }),
  ]);

  return {
    data: pokemon.map((pokemon) => ({
      ...pokemon,
      isLiked: !!pokemon.likes.length,
      types: pokemon.types.map(({ type }) => ({ ...type })),
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
