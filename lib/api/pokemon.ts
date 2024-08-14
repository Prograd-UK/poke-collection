"use server";

import prisma from "@/lib/prisma";

interface GetAllArgs {
  page: number;
  limit: number;
}

export async function getAll({ page, limit }: GetAllArgs) {
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
      },
    }),
  ]);

  return {
    data: pokemon.map((pokemon) => ({
      ...pokemon,
      types: pokemon.types.map(({ type }) => ({ ...type })),
    })),
    pagination: { count, pages: Math.ceil(count / limit) },
  };
}
