import type { Metadata, Viewport } from "next";
import type { JSX, ReactNode } from "react";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { wedding } from "@/lib/wedding-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const script = localFont({
  src: "../../public/fonts/Blosta-Script.otf",
  display: "swap",
  variable: "--font-script-display",
});

export const metadata: Metadata = {
  title: `${wedding.coupleName} — запрошення на весілля ${wedding.dateLabel}`,
  description: `Запрошуємо вас розділити з нами день нашого одруження, ${wedding.dateLabelLong}.`,
};

export const viewport: Viewport = {
  themeColor: "#fffdf5",
};

const NO_FLASH_SCRIPT = "document.documentElement.classList.add('js');";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="uk" className={`${cormorant.variable} ${script.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
