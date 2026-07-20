import type { JSX } from "react";
import { Divider } from "@/components/decor/Divider";
import { ExternalLink } from "@/components/ExternalLink/ExternalLink";
import { Reveal } from "@/components/Reveal/Reveal";
import { wedding } from "@/lib/wedding-data";
import styles from "./Venue.module.css";

export function Venue(): JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="venue-title">
      <div className={styles.inner}>
        <div className={styles.arch}>
          <div className={styles.archInner} aria-hidden="true" />

          <Reveal>
            <h2 id="venue-title" className={styles.title}>
              Місце проведення
            </h2>
            <Divider />
          </Reveal>

          <Reveal delayMs={120}>
            <p className={styles.body}>
              Святкування відбудеться в ресторані «Білий Дім» с. Магала
              <br />
              Чекаємо на вас у затишній атмосфері, щоб разом розділити цей
              особливий день.
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
