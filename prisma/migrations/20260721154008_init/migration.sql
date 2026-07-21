-- CreateEnum
CREATE TYPE "Attendance" AS ENUM ('YES', 'NO');

-- CreateTable
CREATE TABLE "rsvp_submissions" (
    "id" TEXT NOT NULL,
    "guests" TEXT[],
    "attendance" "Attendance" NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rsvp_submissions_pkey" PRIMARY KEY ("id")
);
