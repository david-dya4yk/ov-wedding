export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts
    .filter((part) => typeof part === "string" && part !== "")
    .join(" ");
}
