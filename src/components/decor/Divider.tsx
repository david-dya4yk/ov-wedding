import type { JSX } from "react";
import styles from "./Divider.module.css";

export function Divider({
  tone = "light",
}: {
  tone?: "light" | "dark";
}): JSX.Element {
  return (
    <svg
      className={tone === "dark" ? styles.dividerDark : styles.divider}
      width="120"
      height="18"
      viewBox="0 0 120 18"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2,9 H46 M74,9 H118"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M52,9 C56,4 58,4 60,9 C62,14 64,14 68,9"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="60" cy="9" r="1.6" fill="currentColor" />
    </svg>
  );
}
