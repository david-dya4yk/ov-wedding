"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { JSX, SyntheticEvent } from "react";
import { Divider } from "@/components/decor/Divider";
import { Reveal } from "@/components/Reveal/Reveal";
import { wedding } from "@/lib/wedding-data";
import styles from "./Rsvp.module.css";

type Attendance = "yes" | "no";

interface Errors {
  readonly guest: string | null;
  readonly attendance: string | null;
}

const NO_ERRORS: Errors = { guest: null, attendance: null };

export function Rsvp(): JSX.Element {
  const baseId = useId();
  const guestInputs = useRef<(HTMLInputElement | null)[]>([]);
  const successRef = useRef<HTMLParagraphElement>(null);
  const attendanceRef = useRef<HTMLFieldSetElement>(null);

  const [guests, setGuests] = useState<string[]>([""]);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>(NO_ERRORS);
  const [submitted, setSubmitted] = useState(false);

  const guestErrorId = `${baseId}-guest-error`;
  const attendanceErrorId = `${baseId}-attendance-error`;
  const guestLimitId = `${baseId}-guest-limit`;

  const atLimit = guests.length >= wedding.maxGuests;

  const updateGuest = useCallback((index: number, value: string) => {
    setGuests((current) =>
      current.map((guest, guestIndex) =>
        guestIndex === index ? value : guest,
      ),
    );
    setErrors((current) => ({ ...current, guest: null }));
  }, []);

  const addGuest = useCallback(() => {
    setGuests((current) =>
      current.length >= wedding.maxGuests ? current : [...current, ""],
    );
    window.requestAnimationFrame(() => {
      const inputs = guestInputs.current;
      inputs[inputs.length - 1]?.focus();
    });
  }, []);

  const removeGuest = useCallback((index: number) => {
    setGuests((current) =>
      current.filter((_, guestIndex) => guestIndex !== index),
    );
    window.requestAnimationFrame(() => {
      guestInputs.current[Math.max(0, index - 1)]?.focus();
    });
  }, []);

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const firstGuest = guests[0] ?? "";
      const nextErrors: Errors = {
        guest:
          firstGuest.trim() === ""
            ? "Вкажіть, будь ласка, ваше ім'я та прізвище."
            : null,
        attendance:
          attendance === null
            ? "Оберіть, будь ласка, чи зможете ви бути присутні."
            : null,
      };

      if (nextErrors.guest !== null || nextErrors.attendance !== null) {
        setErrors(nextErrors);
        window.requestAnimationFrame(() => {
          if (nextErrors.guest !== null) {
            guestInputs.current[0]?.focus();
          } else {
            attendanceRef.current
              ?.querySelector<HTMLInputElement>("input[type='radio']")
              ?.focus();
          }
        });
        return;
      }

      setErrors(NO_ERRORS);
      setSubmitted(true);
      window.requestAnimationFrame(() => {
        successRef.current?.focus();
      });
    },
    [attendance, guests],
  );

  const isGroup = guests.length >= 2;

  return (
    <section className={styles.section} aria-labelledby="rsvp-title">
      <div className="paper-texture" aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <h2 id="rsvp-title" className={styles.title}>
            Підтвердження
          </h2>
          <Divider />
          <p className={styles.deadline}>
            Просимо підтвердити вашу присутність до{" "}
            <span className={styles.deadlineDate}>{wedding.rsvpDeadline}</span>
          </p>
        </Reveal>

        {submitted ? (
          <div className={styles.panel}>
            <div className={styles.panelInner} aria-hidden="true" />
            <div className={styles.success} role="status">
              <p className={styles.successTitle} ref={successRef} tabIndex={-1}>
                Дякуємо!
              </p>
              <p className={styles.successText}>
                Ми з нетерпінням чекаємо зустрічі з вами.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.panel}>
            <div className={styles.panelInner} aria-hidden="true" />
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Гості</legend>

                {errors.guest === null ? null : (
                  <p className={styles.error} id={guestErrorId} role="alert">
                    {errors.guest}
                  </p>
                )}

                <ul className={styles.guestList}>
                  {guests.map((guest, index) => {
                    const inputId = `${baseId}-guest-${String(index)}`;
                    const isFirst = index === 0;
                    const invalid = isFirst && errors.guest !== null;

                    return (
                      <li key={inputId} className={styles.guestRow}>
                        <div className={styles.field}>
                          <label className={styles.label} htmlFor={inputId}>
                            {isFirst
                              ? "Ваше ім'я та прізвище"
                              : `Ім'я та прізвище гостя ${String(index + 1)}`}
                          </label>
                          <input
                            id={inputId}
                            ref={(node) => {
                              guestInputs.current[index] = node;
                            }}
                            className={styles.input}
                            type="text"
                            name={`guest-${String(index)}`}
                            autoComplete={isFirst ? "name" : "off"}
                            value={guest}
                            required={isFirst}
                            aria-invalid={invalid}
                            aria-describedby={
                              invalid ? guestErrorId : undefined
                            }
                            onChange={(event) => {
                              updateGuest(index, event.target.value);
                            }}
                          />
                        </div>

                        {isFirst ? null : (
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => {
                              removeGuest(index);
                            }}
                          >
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">
                              Прибрати гостя {String(index + 1)}
                            </span>
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={addGuest}
                  disabled={atLimit}
                  aria-describedby={atLimit ? guestLimitId : undefined}
                >
                  + Додати гостя
                </button>
                {atLimit ? (
                  <p className={styles.hint} id={guestLimitId}>
                    Досягнуто максимум — {String(wedding.maxGuests)} гостей.
                  </p>
                ) : null}
              </fieldset>

              <fieldset className={styles.fieldset} ref={attendanceRef}>
                <legend className={styles.legend}>
                  Чи будете ви присутні?
                </legend>

                {errors.attendance === null ? null : (
                  <p
                    className={styles.error}
                    id={attendanceErrorId}
                    role="alert"
                  >
                    {errors.attendance}
                  </p>
                )}

                <div className={styles.choices}>
                  <label className={styles.choice}>
                    <input
                      className={styles.choiceInput}
                      type="radio"
                      name={`${baseId}-attendance`}
                      value="yes"
                      checked={attendance === "yes"}
                      aria-describedby={
                        errors.attendance === null
                          ? undefined
                          : attendanceErrorId
                      }
                      onChange={() => {
                        setAttendance("yes");
                        setErrors((current) => ({
                          ...current,
                          attendance: null,
                        }));
                      }}
                    />
                    <span className={styles.choiceBox}>
                      {isGroup ? "Так, ми будемо" : "Так, я буду"}
                    </span>
                  </label>

                  <label className={styles.choice}>
                    <input
                      className={styles.choiceInput}
                      type="radio"
                      name={`${baseId}-attendance`}
                      value="no"
                      checked={attendance === "no"}
                      aria-describedby={
                        errors.attendance === null
                          ? undefined
                          : attendanceErrorId
                      }
                      onChange={() => {
                        setAttendance("no");
                        setErrors((current) => ({
                          ...current,
                          attendance: null,
                        }));
                      }}
                    />
                    <span className={styles.choiceBox}>
                      {isGroup ? "На жаль, не зможемо" : "На жаль, не зможу"}
                    </span>
                  </label>
                </div>
              </fieldset>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${baseId}-note`}>
                  Коментар — побажання тощо.
                </label>
                <textarea
                  id={`${baseId}-note`}
                  className={styles.textarea}
                  name="note"
                  rows={3}
                  value={note}
                  onChange={(event) => {
                    setNote(event.target.value);
                  }}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Надіслати підтвердження
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
