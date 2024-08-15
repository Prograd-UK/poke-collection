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
