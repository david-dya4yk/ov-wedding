"use client";

import { useCallback, useEffect, useState } from "react";
import type { JSX, ReactNode } from "react";
import { IntroOverlay } from "@/components/IntroOverlay/IntroOverlay";
import { useIsHydrated } from "@/lib/client-hooks";

const TITLE_ID = "wedding-title";

interface SiteShellProps {
  readonly children: ReactNode;
  readonly footer: ReactNode;
}

export function SiteShell({ children, footer }: SiteShellProps): JSX.Element {
  const hydrated = useIsHydrated();
  const [opened, setOpened] = useState(false);

  const overlayVisible = hydrated && !opened;

  useEffect(() => {
    document.body.classList.toggle("is-locked", overlayVisible);
    return () => {
      document.body.classList.remove("is-locked");
    };
  }, [overlayVisible]);

  const handleOpen = useCallback(() => {
    setOpened(true);
    window.scrollTo({ top: 0 });
    window.requestAnimationFrame(() => {
      document.getElementById(TITLE_ID)?.focus();
    });
  }, []);

  return (
    <>
      {overlayVisible ? null : (
        <a className="skip-link" href="#main">
          Перейти до вмісту
        </a>
      )}
      {overlayVisible ? <IntroOverlay onOpen={handleOpen} /> : null}
      <div inert={overlayVisible}>
        <main id="main">{children}</main>
        {footer}
      </div>
    </>
  );
}
