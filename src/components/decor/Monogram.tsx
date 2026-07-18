import Image from "next/image";
import type { JSX } from "react";
import { cx } from "@/lib/cx";
import styles from "./Monogram.module.css";

const SOURCE_WIDTH = 395;
const SOURCE_HEIGHT = 560;

interface MonogramProps {
  readonly height?: number;
  readonly tone?: "brand" | "light";
  readonly title?: string | undefined;
}

export function Monogram({
  height = 72,
  tone = "brand",
  title,
}: MonogramProps): JSX.Element {
  const width = Math.round((height * SOURCE_WIDTH) / SOURCE_HEIGHT);

  return (
    <Image
      className={cx(styles.monogram, tone === "light" && styles.light)}
      src="/images/monogram.png"
      alt={title ?? ""}
      aria-hidden={title === undefined ? "true" : undefined}
      width={width}
      height={height}
      priority
    />
  );
}
