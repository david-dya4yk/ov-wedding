"use client";

import { useState, useTransition } from "react";
import type { JSX } from "react";
import {
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  Pencil,
  Plus,
  Trash2,
  User,
  X,
  XCircle,
} from "lucide-react";
import { wedding } from "@/lib/wedding-data";
import { deleteSubmission, updateSubmission } from "./actions";
import styles from "./admin.module.css";

type Attendance = "YES" | "NO";

interface SubmissionCardProps {
  readonly id: string;
  readonly guests: readonly string[];
  readonly attendance: Attendance;
  readonly note: string;
  readonly dateLabel: string;
}

export function SubmissionCard({
  id,
  guests: initialGuests,
  attendance: initialAttendance,
  note: initialNote,
  dateLabel,
}: SubmissionCardProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [guests, setGuests] = useState<string[]>([...initialGuests]);
  const [attendance, setAttendance] = useState<Attendance>(initialAttendance);
  const [note, setNote] = useState(initialNote);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const atLimit = guests.length >= wedding.maxGuests;

  function cancelEdit(): void {
    setGuests([...initialGuests]);
    setAttendance(initialAttendance);
    setNote(initialNote);
    setError(null);
    setEditing(false);
  }

  function save(): void {
    setError(null);
    startTransition(() => {
      void updateSubmission(id, { guests, attendance, note }).then((result) => {
        if (result.error) {
          setError(result.error);
          return;
        }
        setEditing(false);
      });
    });
  }

  function remove(): void {
    if (!window.confirm("Видалити цю заявку?")) return;
    startTransition(() => {
      void deleteSubmission(id);
    });
  }

  if (editing) {
    return (
      <li className={styles.card}>
        <div className={styles.editForm}>
          <div className={styles.guestList}>
            {guests.map((guest, index) => (
              <div
                key={`${id}-guest-${String(index)}`}
                className={styles.guestRow}
              >
                <User
                  size={15}
                  className={styles.guestIcon}
                  aria-hidden="true"
                />
                <input
                  className={styles.editInput}
                  value={guest}
                  onChange={(event) => {
                    const value = event.target.value;
                    setGuests((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? value : item,
                      ),
                    );
                  }}
                />
                {guests.length > 1 ? (
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => {
                      setGuests((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      );
                    }}
                    aria-label="Прибрати гостя"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.addGuestButton}
            disabled={atLimit}
            onClick={() => {
              setGuests((current) =>
                current.length >= wedding.maxGuests
                  ? current
                  : [...current, ""],
              );
            }}
          >
            <Plus size={14} aria-hidden="true" />
            Додати гостя
          </button>

          <div className={styles.editChoices}>
            <label className={styles.editChoice}>
              <input
                type="radio"
                checked={attendance === "YES"}
                onChange={() => {
                  setAttendance("YES");
                }}
              />
              Прийде
            </label>
            <label className={styles.editChoice}>
              <input
                type="radio"
                checked={attendance === "NO"}
                onChange={() => {
                  setAttendance("NO");
                }}
              />
              Не прийде
            </label>
          </div>

          <textarea
            className={styles.editTextarea}
            rows={2}
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
            placeholder="Коментар"
          />

          {error === null ? null : <p className={styles.editError}>{error}</p>}

          <div className={styles.editActions}>
            <button
              type="button"
              className={styles.saveButton}
              disabled={isPending}
              onClick={save}
            >
              Зберегти
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              disabled={isPending}
              onClick={cancelEdit}
            >
              Скасувати
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <span
          className={attendance === "YES" ? styles.badgeYes : styles.badgeNo}
        >
          {attendance === "YES" ? (
            <CheckCircle2 size={16} aria-hidden="true" />
          ) : (
            <XCircle size={16} aria-hidden="true" />
          )}
          {attendance === "YES" ? "Прийде" : "Не прийде"}
        </span>
        <span className={styles.date}>
          <CalendarClock size={14} aria-hidden="true" />
          {dateLabel}
        </span>
      </div>

      <ul className={styles.guestList}>
        {guests.map((guest, index) => (
          <li key={`${id}-${String(index)}`} className={styles.guestRow}>
            <User size={15} className={styles.guestIcon} aria-hidden="true" />
            <span>{guest}</span>
          </li>
        ))}
      </ul>

      {note === "" ? null : (
        <div className={styles.note}>
          <MessageSquareText
            size={16}
            className={styles.noteIcon}
            aria-hidden="true"
          />
          <span>{note}</span>
        </div>
      )}

      <div className={styles.cardActions}>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => {
            setEditing(true);
          }}
        >
          <Pencil size={14} aria-hidden="true" />
          Редагувати
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          disabled={isPending}
          onClick={remove}
        >
          <Trash2 size={14} aria-hidden="true" />
          Видалити
        </button>
      </div>
    </li>
  );
}
