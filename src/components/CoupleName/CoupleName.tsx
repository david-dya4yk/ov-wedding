import type { JSX } from "react";
import { wedding } from "@/lib/wedding-data";
import styles from "./CoupleName.module.css";

export function CoupleName(): JSX.Element {
  return (
    <>
      {wedding.groomName} <span className={styles.ampersand}>&amp;</span>{" "}
      {wedding.brideName}
    </>
  );
}
