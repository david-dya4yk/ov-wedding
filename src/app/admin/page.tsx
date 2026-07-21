import type { JSX } from "react";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { prisma } from "@/lib/prisma";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

type Filter = "all" | "yes" | "no";

function parseFilter(value: string | undefined): Filter {
  return value === "yes" || value === "no" ? value : "all";
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Kyiv",
  }).format(date);
}

interface AdminPageProps {
  readonly searchParams: Promise<{ filter?: string }>;
}

export default async function AdminPage({
  searchParams,
}: AdminPageProps): Promise<JSX.Element> {
  const filter = parseFilter((await searchParams).filter);

  const submissions = await prisma.rsvpSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const attendingSubmissions = submissions.filter(
    (submission) => submission.attendance === "YES",
  );
  const decliningSubmissions = submissions.filter(
    (submission) => submission.attendance === "NO",
  );
  const totalGuests = attendingSubmissions.reduce(
    (sum, submission) => sum + submission.guests.length,
    0,
  );

  const visibleSubmissions =
    filter === "yes"
      ? attendingSubmissions
      : filter === "no"
        ? decliningSubmissions
        : submissions;

  const tabs: { readonly key: Filter; readonly label: string }[] = [
    { key: "all", label: `Усі (${String(submissions.length)})` },
    { key: "yes", label: `Прийдуть (${String(attendingSubmissions.length)})` },
    {
      key: "no",
      label: `Не прийдуть (${String(decliningSubmissions.length)})`,
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Users className={styles.headerIcon} aria-hidden="true" />
        <h1 className={styles.title}>Заявки RSVP</h1>
      </header>

      <div className={styles.summary}>
        <div className={styles.statCard}>
          <CalendarClock className={styles.statIcon} aria-hidden="true" />
          <div>
            <p className={styles.statValue}>{submissions.length}</p>
            <p className={styles.statLabel}>Всього відповідей</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <CheckCircle2
            className={cx(styles.statIcon, styles.statIconYes)}
            aria-hidden="true"
          />
          <div>
            <p className={styles.statValue}>{attendingSubmissions.length}</p>
            <p className={styles.statLabel}>Прийдуть</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <XCircle
            className={cx(styles.statIcon, styles.statIconNo)}
            aria-hidden="true"
          />
          <div>
            <p className={styles.statValue}>{decliningSubmissions.length}</p>
            <p className={styles.statLabel}>Не прийдуть</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <Users className={styles.statIcon} aria-hidden="true" />
          <div>
            <p className={styles.statValue}>{totalGuests}</p>
            <p className={styles.statLabel}>Гостей загалом</p>
          </div>
        </div>
      </div>

      <nav className={styles.tabs} aria-label="Фільтр заявок">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === "all" ? "/admin" : `/admin?filter=${tab.key}`}
            className={cx(
              styles.tab,
              filter === tab.key ? styles.tabActive : null,
            )}
            aria-current={filter === tab.key ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {visibleSubmissions.length === 0 ? (
        <p className={styles.empty}>Немає заявок для цього фільтра.</p>
      ) : (
        <ul className={styles.list}>
          {visibleSubmissions.map((submission) => (
            <li key={submission.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span
                  className={
                    submission.attendance === "YES"
                      ? styles.badgeYes
                      : styles.badgeNo
                  }
                >
                  {submission.attendance === "YES" ? (
                    <CheckCircle2 size={16} aria-hidden="true" />
                  ) : (
                    <XCircle size={16} aria-hidden="true" />
                  )}
                  {submission.attendance === "YES" ? "Прийде" : "Не прийде"}
                </span>
                <span className={styles.date}>
                  <CalendarClock size={14} aria-hidden="true" />
                  {formatDate(submission.createdAt)}
                </span>
              </div>

              <ul className={styles.guestList}>
                {submission.guests.map((guest, index) => (
                  <li
                    key={`${submission.id}-${String(index)}`}
                    className={styles.guestRow}
                  >
                    <User
                      size={15}
                      className={styles.guestIcon}
                      aria-hidden="true"
                    />
                    <span>{guest}</span>
                  </li>
                ))}
              </ul>

              {submission.note === "" ? null : (
                <div className={styles.note}>
                  <MessageSquareText
                    size={16}
                    className={styles.noteIcon}
                    aria-hidden="true"
                  />
                  <span>{submission.note}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
