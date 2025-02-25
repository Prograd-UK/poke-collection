"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

interface CompleteArgs { checklistStepType: string  }

export async function completeChecklistStep({ checklistStepType}: CompleteArgs) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const checklistStep = await prisma.checklistStep.findUnique({
    where: { type: checklistStepType }
  });

  if (!checklistStep) {
    throw new Error("Checklist step not found");
  }

  const completion = await prisma.userChecklistStepCompletion.upsert({
    where: { id: `${userId}_${checklistStep.id}` },
    update: { completed: true },
    create: { userId, checklistStepId: checklistStep.id, completed: true }
  });

  revalidatePath("/");
  revalidatePath(`/checklist/${checklistStep.checklistId}`);

  return completion;
}
