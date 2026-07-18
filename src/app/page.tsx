import type { JSX } from "react";
import { Countdown } from "@/components/Countdown/Countdown";
import { DressCode } from "@/components/DressCode/DressCode";
import { Hero } from "@/components/Hero/Hero";
import { Invitation } from "@/components/Invitation/Invitation";
import { Programme } from "@/components/Programme/Programme";
import { Rsvp } from "@/components/Rsvp/Rsvp";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteShell } from "@/components/SiteShell/SiteShell";
import { Venue } from "@/components/Venue/Venue";

export default function Home(): JSX.Element {
  return (
    <SiteShell footer={<SiteFooter />}>
      <Hero />
      <Invitation />
      <Venue />
      <Programme />
      <Countdown />
      <DressCode />
      <Rsvp />
    </SiteShell>
  );
}
