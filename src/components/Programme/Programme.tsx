import type { JSX } from "react";
import { Divider } from "@/components/decor/Divider";
import { ExternalLink } from "@/components/ExternalLink/ExternalLink";
import { Reveal } from "@/components/Reveal/Reveal";
import { programme } from "@/lib/wedding-data";
import styles from "./Programme.module.css";

export function Programme(): JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="programme-title">
      <div className="paper-texture" aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <h2 id="programme-title" className={styles.title}>
            Програма дня
          </h2>
          <Divider />
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.dateColumn}>
            <p className={styles.date}>
              <time dateTime="2026-08-22">
                22 серпня
                <br />
                2026
              </time>
            </p>
          </Reveal>

          <div className={styles.spine} aria-hidden="true" />

          <ol className={styles.list}>
            {programme.map((item, index) => (
              <li key={item.id}>
                <Reveal delayMs={index * 80}>
                  <p className={styles.time}>
                    <time dateTime={`2026-08-22T${item.time}`}>
                      {item.time}
                    </time>
                  </p>
                  <p className={styles.itemTitle}>{item.title}</p>
                  {item.place === "" ? null : (
                    <p className={styles.place}>
                      <ExternalLink
                        href={item.mapUrl}
                        className={styles.placeLink}
                      >
                        {item.place}
                      </ExternalLink>
                    </p>
                  )}
                  {item.address === "" ? null : (
                    <p className={styles.address}>{item.address}</p>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
