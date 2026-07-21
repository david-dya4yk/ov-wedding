import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile();
} catch {
  // .env is optional (e.g. in CI/production where DATABASE_URL is already set).
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Plain access (not the validating `env()` helper): `prisma generate`
    // runs during the Docker build, before DATABASE_URL is injected at
    // container runtime, and must not fail when it's unset.
    ...(process.env.DATABASE_URL === undefined
      ? {}
      : { url: process.env.DATABASE_URL }),
  },
});
