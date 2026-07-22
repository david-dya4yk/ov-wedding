"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  MAX_NAME_LENGTH,
  MAX_NOTE_LENGTH,
  sanitizeGuests,
} from "@/lib/rsvp-limits";

export interface UpdateSubmissionInput {
  readonly guests: readonly string[];
  readonly attendance: "YES" | "NO";
  readonly note: string;
}

export interface UpdateSubmissionResult {
  readonly error?: string;
}

export async function deleteSubmission(id: string): Promise<void> {
  await prisma.rsvpSubmission.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function updateSubmission(
  id: string,
  input: UpdateSubmissionInput,
): Promise<UpdateSubmissionResult> {
  const guests = sanitizeGuests(input.guests);

  if (guests.length === 0 || (guests[0]?.length ?? 0) > MAX_NAME_LENGTH) {
    return { error: "Вкажіть ім'я та прізвище гостя." };
  }

  if (guests.some((guest) => guest.length > MAX_NAME_LENGTH)) {
    return { error: "Задовге ім'я гостя." };
  }

  const note = input.note.trim().slice(0, MAX_NOTE_LENGTH);

  await prisma.rsvpSubmission.update({
    where: { id },
    data: { guests, attendance: input.attendance, note },
  });

  revalidatePath("/admin");
  return {};
}
