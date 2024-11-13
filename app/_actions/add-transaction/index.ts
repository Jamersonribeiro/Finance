"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { upsertTransactionSchema } from "./schema";

interface UpsertTransactionParams {
  id?: string; // Optional, so it could be undefined
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params); // Validate the input

  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthorized");
  }

  // Only upsert if `id` exists, otherwise create a new record
  if (params.id) {
    await db.transaction.upsert({
      where: {
        id: params.id, // A verificação do `id` é crucial aqui
      },
      update: { ...params, userId },
      create: { ...params, userId },
    });
  } else {
    await db.transaction.create({
      data: { ...params, userId }, // No `id`, so we create a new transaction
    });
  }

  revalidatePath("/transactions");
};
