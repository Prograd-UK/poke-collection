"use server";

import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getAllByPokemonId(pokemonId: string) {
  const comments = await prisma.comment.findMany({
    where: { pokemonId },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      userId: true,
      content: true,
      createdAt: true,
    },
  });

  const users = await clerkClient().users.getUserList({
    userId: comments.map((comment) => comment.userId),
    limit: 100,
  });

  return comments.map(({ userId, ...rest }) => {
    const author = users.data.find((user) => user.id === userId);

    return {
      ...rest,
      author: author
        ? {
            id: author.id,
            username: author.username || author.firstName,
            avatar: author.imageUrl,
          }
        : null,
    };
  });
}

interface CreateArgs {
  pokemonId: string;
  content: string;
}

export async function create({ pokemonId, content }: CreateArgs) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const comment = await prisma.comment.create({
    data: {
      pokemonId,
      userId,
      content,
    },
  });

  revalidatePath("/");
  revalidatePath(`/pokemon/${pokemonId}`);

  return comment;
}
