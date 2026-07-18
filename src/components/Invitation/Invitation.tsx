import type { JSX } from "react";
import { CoupleName } from "@/components/CoupleName/CoupleName";
import { Divider } from "@/components/decor/Divider";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Invitation.module.css";

export function Invitation(): JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="invitation-title">
      <div className="paper-texture" aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <h2 id="invitation-title" className={styles.title}>
            День, про який ми мріяли
          </h2>
          <Divider />
        </Reveal>

        <Reveal delayMs={200} className={styles.framed}>
          <div className={styles.ornament} aria-hidden="true" />
          <p className={styles.body}>
            Будемо щиро раді бачити вас серед найближчих людей, аби разом
            наповнити цей день теплом, любов&apos;ю та світлими спогадами, які
            залишаться з нами назавжди.
          </p>
        </Reveal>

        <Reveal delayMs={280}>
          <p className={styles.signatureIntro}>з любов&apos;ю,</p>
          <p className={styles.signature}>
            <CoupleName />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
