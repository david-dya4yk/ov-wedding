import type { JSX } from "react";
import { Divider } from "@/components/decor/Divider";
import { ExternalLink } from "@/components/ExternalLink/ExternalLink";
import { Reveal } from "@/components/Reveal/Reveal";
import { cx } from "@/lib/cx";
import { wedding } from "@/lib/wedding-data";
import styles from "./Venue.module.css";

export function Venue(): JSX.Element {
  return (
    <section
      className={cx(styles.section, "on-dark")}
      aria-labelledby="venue-title"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.arch}>
          <div className={styles.archInner} aria-hidden="true" />

          <Reveal>
            <h2 id="venue-title" className={styles.title}>
              Місце проведення
            </h2>
            <Divider tone="dark" />
          </Reveal>

          <Reveal delayMs={120}>
            <p className={styles.body}>
              Святкування відбудеться в ресторані «Білий Дім» за адресою вул.
              Святкова, 1. На вас чекає затишна зала, вишукана вечеря та тепла
              атмосфера, аби ми могли розділити цей особливий вечір разом із
              вами.
            </p>
            <p className={styles.linkRow}>
              <ExternalLink href={wedding.mapUrl} className={styles.mapLink}>
                Переглянути на карті
              </ExternalLink>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
