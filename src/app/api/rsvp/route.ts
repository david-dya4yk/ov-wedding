import { prisma } from "@/lib/prisma";
import {
  MAX_NAME_LENGTH,
  MAX_NOTE_LENGTH,
  sanitizeGuests,
} from "@/lib/rsvp-limits";

interface RsvpPayload {
  readonly guests: readonly string[];
  readonly attendance: "yes" | "no";
  readonly note: string;
  readonly website?: string;
}

function isRsvpPayload(value: unknown): value is RsvpPayload {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    Array.isArray(candidate.guests) &&
    candidate.guests.every((guest) => typeof guest === "string") &&
    (candidate.attendance === "yes" || candidate.attendance === "no") &&
    typeof candidate.note === "string"
  );
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некоректний запит." }, { status: 400 });
  }

  if (!isRsvpPayload(body)) {
    return Response.json({ error: "Некоректні дані форми." }, { status: 400 });
  }

  // Honeypot: bots tend to fill hidden fields humans never see.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true }, { status: 201 });
  }

  const guests = sanitizeGuests(body.guests);

  if (guests.length === 0 || (guests[0]?.length ?? 0) > MAX_NAME_LENGTH) {
    return Response.json(
      { error: "Вкажіть ваше ім'я та прізвище." },
      {
        status: 400,
      },
    );
  }

  if (guests.some((guest) => guest.length > MAX_NAME_LENGTH)) {
    return Response.json({ error: "Задовге ім'я гостя." }, { status: 400 });
  }

  const note = body.note.trim().slice(0, MAX_NOTE_LENGTH);

  await prisma.rsvpSubmission.create({
    data: {
      guests,
      attendance: body.attendance === "yes" ? "YES" : "NO",
      note,
    },
  });

  return Response.json({ ok: true }, { status: 201 });
}
