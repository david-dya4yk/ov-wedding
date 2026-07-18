export interface ProgrammeItem {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly place: string;
  readonly address: string;
  readonly mapUrl: string;
}

const MAP_URL = "https://maps.app.goo.gl/MEykCFdQSD1bWdCQ9";

export const wedding = {
  coupleName: "Oleh & Victoria",
  groomName: "Oleh",
  brideName: "Victoria",
  dateLabel: "22 · 08 · 2026",
  dateLabelLong: "22 серпня 2026 року",
  ceremonyIso: "2026-08-22T12:00:00+03:00",
  rsvpDeadline: "01.08.2026",
  mapUrl: MAP_URL,
  maxGuests: 10,
} as const;

export const programme: readonly ProgrammeItem[] = [
  {
    id: "vinchannia",
    time: "11:00",
    title: "Таїнство вінчання",
    place: "Храм Трьох Святителів",
    address: "вул. Коцюбинського, 2",
    mapUrl: MAP_URL,
  },
  {
    id: "benket",
    time: "14:00",
    title: "Святковий бенкет",
    place: "Ресторан «Білий Дім»",
    address: "с. Магала",
    mapUrl: MAP_URL,
  },
  {
    id: "zavershennia",
    time: "23:00",
    title: "Завершення святкування",
    place: "",
    address: "",
    mapUrl: MAP_URL,
  },
];

export const dressCodeColors: readonly {
  readonly id: string;
  readonly label: string;
  readonly swatch: string;
}[] = [
  { id: "white", label: "Білий", swatch: "#f4e9d2" },
  { id: "black", label: "Чорний", swatch: "#181310" },
];
