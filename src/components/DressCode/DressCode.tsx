import Image from "next/image";
import type { JSX } from "react";
import { Divider } from "@/components/decor/Divider";
import { Reveal } from "@/components/Reveal/Reveal";
import { dressCodeColors } from "@/lib/wedding-data";
import styles from "./DressCode.module.css";

export function DressCode(): JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="dresscode-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal className={styles.card}>
          <h2 id="dresscode-title" className={styles.title}>
            Дрес-код
          </h2>
          <Divider />

          <p className={styles.lead}>
            Будемо вдячні, якщо ви підтримаєте чорно-білу палітру нашого свята.
          </p>

          <ul className={styles.swatches}>
            {dressCodeColors.map((color) => (
              <li key={color.id} className={styles.swatchItem}>
                <Image
                  className={styles.stroke}
                  src={color.image}
                  alt=""
                  width={350}
                  height={190}
                />
                <span className={styles.swatchLabel}>{color.label}</span>
              </li>
            ))}
          </ul>

          <h3 className={styles.subtitle}>Деталі</h3>
          <p className={styles.note}>
            Замість квітів і солодощів будемо вдячні за донат на підтримку ЗСУ.
            На святі буде благодійна скринька.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
