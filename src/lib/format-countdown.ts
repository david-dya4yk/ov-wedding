export interface Countdown {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export function getCountdown(targetMs: number, nowMs: number): Countdown {
  let remaining = Math.max(0, targetMs - nowMs);

  const days = Math.floor(remaining / MS_PER_DAY);
  remaining -= days * MS_PER_DAY;
  const hours = Math.floor(remaining / MS_PER_HOUR);
  remaining -= hours * MS_PER_HOUR;
  const minutes = Math.floor(remaining / MS_PER_MINUTE);
  remaining -= minutes * MS_PER_MINUTE;
  const seconds = Math.floor(remaining / MS_PER_SECOND);

  return { days, hours, minutes, seconds };
}

export function padTwo(value: number): string {
  return String(value).padStart(2, "0");
}

type PluralForms = readonly [one: string, few: string, many: string];

const pluralRules = new Intl.PluralRules("uk-UA");

function plural(value: number, forms: PluralForms): string {
  const category = pluralRules.select(value);
  if (category === "one") {
    return forms[0];
  }
  if (category === "few") {
    return forms[1];
  }
  return forms[2];
}

const DAY_FORMS: PluralForms = ["день", "дні", "днів"];
const HOUR_FORMS: PluralForms = ["година", "години", "годин"];
const MINUTE_FORMS: PluralForms = ["хвилина", "хвилини", "хвилин"];
const SECOND_FORMS: PluralForms = ["секунда", "секунди", "секунд"];

export const countdownUnitLabels = {
  days: DAY_FORMS,
  hours: HOUR_FORMS,
  minutes: MINUTE_FORMS,
  seconds: SECOND_FORMS,
} as const;

export type CountdownUnit = keyof typeof countdownUnitLabels;

export function pluralizeUnit(value: number, unit: CountdownUnit): string {
  return plural(value, countdownUnitLabels[unit]);
}

export function longestUnitLabel(unit: CountdownUnit): string {
  return countdownUnitLabels[unit].reduce((longest, form) =>
    form.length > longest.length ? form : longest,
  );
}

export function describeCountdown(countdown: Countdown): string {
  if (
    countdown.days === 0 &&
    countdown.hours === 0 &&
    countdown.minutes === 0 &&
    countdown.seconds === 0
  ) {
    return "Наш день настав";
  }

  const parts: string[] = [];
  if (countdown.days > 0) {
    parts.push(
      `${String(countdown.days)} ${plural(countdown.days, DAY_FORMS)}`,
    );
  }
  if (countdown.hours > 0) {
    parts.push(
      `${String(countdown.hours)} ${plural(countdown.hours, HOUR_FORMS)}`,
    );
  }
  if (countdown.days === 0) {
    parts.push(
      `${String(countdown.minutes)} ${plural(countdown.minutes, MINUTE_FORMS)}`,
    );
  }

  return `До весілля залишилось ${parts.join(", ")}`;
}
