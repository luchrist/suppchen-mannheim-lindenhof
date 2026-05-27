"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force-mute (iOS may reset it between SPA navigations).
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    let cancelled = false;
    let started = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Never reveal a paused <video> — iOS draws a "tap to play" overlay over it.
    // We only flip `playing` on the real "playing" event; until then the poster
    // <img> shows. iOS Low Power Mode blocks autoplay entirely, so we also retry
    // play() on every user gesture (which carries the activation iOS requires).
    const tryPlay = () => {
      if (cancelled || started) return;
      video.play().catch(() => {});
    };

    tryPlay();
    [50, 200, 500, 1500, 3000].forEach((ms) => timers.push(window.setTimeout(tryPlay, ms)));

    const onPlaying = () => {
      started = true;
      setPlaying(true);
      removeGestureListeners();
    };
    video.addEventListener("playing", onPlaying);

    const onLoaded = () => tryPlay();
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("canplay", onLoaded);

    const gestureEvents = ["touchstart", "touchend", "pointerdown", "click", "scroll", "keydown", "wheel"] as const;
    const onGesture = () => tryPlay();
    gestureEvents.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
    const removeGestureListeners = () => gestureEvents.forEach((ev) => window.removeEventListener(ev, onGesture));

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      removeGestureListeners();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-ink">
      {/* Poster frame — shown until the video actually plays. No `poster` attr:
          that makes iOS draw a tappable play-button overlay. */}
      <img
        src="/hero-poster.webp"
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
      />
      {/* Video background */}
      <video
        ref={videoRef}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disableRemotePlayback
        {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
      >
        <source src="/hero-bg.webm" type="video/webm" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-end">
        <div className="w-full max-w-[1400px] mx-auto px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
          <div className="max-w-lg">
            <h1 className="font-display text-[36px] leading-[0.95] tracking-tight text-bone sm:text-[44px] md:text-[58px] lg:text-[68px] drop-shadow-lg">
              Kneipe
              <br />
              <span className="italic text-messing-300">im Lindenhof.</span>
            </h1>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-bone/85 md:text-[16px] drop-shadow-md">
              Süppchen, Meerfeldstraße. Kühle Getränke, Musik und ein Tresen für entspannte Abende mitten im Mannheimer Lindenhof.
            </p>
            <div className="mt-6 flex items-center gap-4 md:mt-8">
              <a
                href="#geschichte"
                className="inline-flex items-center justify-center rounded-full bg-wald-500 px-7 py-3 text-[13px] font-medium tracking-wide text-bone transition-colors hover:bg-wald-600"
              >
                Zur Kneipe
              </a>
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full border border-bone/50 px-7 py-3 text-[13px] font-medium tracking-wide text-bone transition-colors hover:bg-bone/10"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
