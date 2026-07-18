"use client";

import { useMemo } from "react";
import type { JSX } from "react";
import { Reveal } from "@/components/Reveal/Reveal";
import { useNowMs } from "@/lib/client-hooks";
import {
  describeCountdown,
  getCountdown,
  longestUnitLabel,
  padTwo,
  pluralizeUnit,
} from "@/lib/format-countdown";
import { wedding } from "@/lib/wedding-data";
import styles from "./Countdown.module.css";

const PLACEHOLDER = "––";

export function Countdown(): JSX.Element {
  const targetMs = useMemo(() => new Date(wedding.ceremonyIso).getTime(), []);
  const nowMs = useNowMs();

  const countdown = nowMs === 0 ? null : getCountdown(targetMs, nowMs);

  const units =
    countdown === null
      ? ([
          { key: "days", value: PLACEHOLDER, label: "днів" },
          { key: "hours", value: PLACEHOLDER, label: "годин" },
          { key: "minutes", value: PLACEHOLDER, label: "хвилин" },
          { key: "seconds", value: PLACEHOLDER, label: "секунд" },
        ] as const)
      : ([
          {
            key: "days",
            value: String(countdown.days),
            label: pluralizeUnit(countdown.days, "days"),
          },
          {
            key: "hours",
            value: padTwo(countdown.hours),
            label: pluralizeUnit(countdown.hours, "hours"),
          },
          {
            key: "minutes",
            value: padTwo(countdown.minutes),
            label: pluralizeUnit(countdown.minutes, "minutes"),
          },
          {
            key: "seconds",
            value: padTwo(countdown.seconds),
            label: pluralizeUnit(countdown.seconds, "seconds"),
          },
        ] as const);

  return (
    <section className={styles.section} aria-labelledby="countdown-title">
      <div className="paper-texture" aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <h2 id="countdown-title" className={styles.title}>
            До нашого дня залишилось
          </h2>

          <p className="sr-only">
            {countdown === null
              ? "Відлік завантажується"
              : describeCountdown(countdown)}
          </p>

          <div className={styles.clock} role="timer" aria-live="off">
            {units.map((unit, index) => (
              <div key={unit.key} className={styles.unitRow}>
                {index === 0 ? null : (
                  <span className={styles.separator} aria-hidden="true">
                    :
                  </span>
                )}
                <span className={styles.unit} aria-hidden="true">
                  <span className={styles.value}>{unit.value}</span>
                  <span className={styles.label}>
                    <span className={styles.labelSizer}>
                      {longestUnitLabel(unit.key)}
                    </span>
                    <span className={styles.labelText}>{unit.label}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
