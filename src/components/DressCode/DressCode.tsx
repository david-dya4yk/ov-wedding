import type { JSX } from "react";
import { Divider } from "@/components/decor/Divider";
import { Reveal } from "@/components/Reveal/Reveal";
import { cx } from "@/lib/cx";
import { dressCodeColors } from "@/lib/wedding-data";
import styles from "./DressCode.module.css";

export function DressCode(): JSX.Element {
  return (
    <section
      className={cx(styles.section, "on-dark")}
      aria-labelledby="dresscode-title"
    >
      <div className={styles.cornerTopLeft} aria-hidden="true" />
      <div className={styles.cornerTopRight} aria-hidden="true" />
      <div className={styles.cornerBottomLeft} aria-hidden="true" />
      <div className={styles.cornerBottomRight} aria-hidden="true" />
      <div className={styles.sprigLeft} aria-hidden="true" />
      <div className={styles.sprigRight} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <h2 id="dresscode-title" className={styles.title}>
            Дрес-код та деталі
          </h2>
          <Divider tone="dark" />
        </Reveal>

        <Reveal delayMs={120}>
          <ul className={styles.swatches}>
            {dressCodeColors.map((color) => (
              <li key={color.id} className={styles.swatchItem}>
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: color.swatch }}
                  aria-hidden="true"
                />
                <span className={styles.swatchLabel}>{color.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={200}>
          <p className={styles.note}>
            Замість квітів чи солодощів будемо щиро вдячні за донат у скриньку
            для ЗСУ, що буде на святі.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
