import type { JSX } from "react";
import { CoupleName } from "@/components/CoupleName/CoupleName";
import { Monogram } from "@/components/decor/Monogram";
import { cx } from "@/lib/cx";
import { wedding } from "@/lib/wedding-data";
import styles from "./Hero.module.css";

export function Hero(): JSX.Element {
  return (
    <section
      className={cx(styles.hero, "on-dark")}
      aria-labelledby="wedding-title"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.arch}>
          <div className={styles.archInner} aria-hidden="true" />
          <span className={styles.monogram}>
            <Monogram height={110} tone="light" />
          </span>
          <h1 id="wedding-title" className={styles.title} tabIndex={-1}>
            <span className={styles.names}>
              <CoupleName />
            </span>
            <span className={styles.date}>
              <span className={styles.rule} aria-hidden="true" />
              <span>{wedding.dateLabel}</span>
              <span className={styles.rule} aria-hidden="true" />
            </span>
          </h1>
        </div>
      </div>

      <span className={styles.scrollCue} aria-hidden="true">
        ⌄
      </span>
    </section>
  );
}
