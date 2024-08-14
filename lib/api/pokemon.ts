"use server";

import prisma from "@/lib/prisma";

interface GetAllArgs {
  page: number;
  limit: number;
}

export async function getAll({ page, limit }: GetAllArgs) {
  const [count, data] = await Promise.all([
    prisma.pokemon.count(),
    prisma.pokemon.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: "asc" },
    }),
  ]);

  return { data, pagination: { count, pages: Math.ceil(count / limit) } };
}
