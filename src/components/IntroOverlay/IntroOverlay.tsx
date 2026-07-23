"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { CoupleName } from "@/components/CoupleName/CoupleName";
import { usePrefersReducedMotion } from "@/lib/client-hooks";
import styles from "./IntroOverlay.module.css";

const INTRO_VIDEO_WEBM_SRC = "/video/intro.webm";
const INTRO_VIDEO_MP4_SRC = "/video/intro.mp4";
const INTRO_POSTER_SRC = "/images/intro-poster.jpg";
const MAX_INTRO_MS = 9000;
const EXIT_MS = 1400;
const CAPTION_LEAD_S = 1;

export function IntroOverlay({ onOpen }: { onOpen: () => void }): JSX.Element {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const isFinishingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [videoUsable, setVideoUsable] = useState(true);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video === null || !Number.isFinite(video.duration)) {
      return;
    }
    const rate = video.playbackRate || 1;
    const remainingRealSeconds = (video.duration - video.currentTime) / rate;
    if (remainingRealSeconds <= CAPTION_LEAD_S) {
      setShowCaption(true);
    }
  }, []);

  const finish = useCallback(() => {
    if (isFinishingRef.current) {
      return;
    }
    isFinishingRef.current = true;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (reducedMotion) {
      onOpen();
      return;
    }

    setClosing(true);
    exitTimeoutRef.current = window.setTimeout(onOpen, EXIT_MS);
  }, [onOpen, reducedMotion]);

  useEffect(() => {
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        finish();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [finish]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    if (playing) {
      return;
    }

    const video = videoRef.current;

    if (reducedMotion || !videoUsable || video === null) {
      finish();
      return;
    }

    setPlaying(true);
    video.muted = true;
    video.playbackRate = 2;
    void video.play().catch(() => {
      finish();
    });
    timeoutRef.current = window.setTimeout(finish, MAX_INTRO_MS);
  }, [finish, playing, reducedMotion, videoUsable]);

  return (
    <div className={styles.overlay} data-closing={closing ? "true" : "false"}>
      <video
        ref={videoRef}
        className={styles.video}
        poster={INTRO_POSTER_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onTimeUpdate={handleTimeUpdate}
        onEnded={finish}
        onError={() => {
          setVideoUsable(false);
        }}
      >
        <source src={INTRO_VIDEO_WEBM_SRC} type="video/webm" />
        <source src={INTRO_VIDEO_MP4_SRC} type="video/mp4" />
      </video>
      <div className={styles.scrim} aria-hidden="true" />

      <button
        ref={openButtonRef}
        type="button"
        className={styles.openButton}
        onClick={start}
      >
        <span className={styles.openButtonLabel}>
          {playing ? "Триває вступне відео" : "Відкрити запрошення"}
        </span>
      </button>

      <div
        className={styles.caption}
        data-visible={showCaption ? "true" : "false"}
        aria-hidden="true"
      >
        <p className={styles.captionNames}>
          <CoupleName />
        </p>
      </div>

      <p className={styles.hint} data-visible={playing ? "false" : "true"}>
        <span aria-hidden="true">Натисніть, щоб відкрити</span>
      </p>
    </div>
  );
}
