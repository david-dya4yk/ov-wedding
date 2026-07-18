import type { JSX } from "react";
import { CoupleName } from "@/components/CoupleName/CoupleName";
import { Monogram } from "@/components/decor/Monogram";
import { cx } from "@/lib/cx";
import { wedding } from "@/lib/wedding-data";
import styles from "./SiteFooter.module.css";

export function SiteFooter(): JSX.Element {
  return (
    <footer className={cx(styles.footer, "on-dark")}>
      <span className={styles.monogram}>
        <Monogram height={88} tone="light" />
      </span>
      <p className={styles.names}>
        <CoupleName />
      </p>
      <p className={styles.date}>
        <time dateTime="2026-08-22">{wedding.dateLabel}</time>
      </p>
    </footer>
  );
}
