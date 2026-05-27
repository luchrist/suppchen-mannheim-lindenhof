"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const show = () => setVideoReady(true);

    video.addEventListener("playing", show, { once: true });

    if (video.readyState >= 2) {
      show();
    }

    // iPad/iPhone Safari may block autoplay even when muted — and iOS Low Power
    // Mode blocks it entirely and cannot be forced. Show the poster frame anyway.
    video.play().catch(show);
    const posterFallback = window.setTimeout(show, 800);

    // Fallback: try to play on first user interaction (iPad with autoplay disabled)
    const tryPlay = () => {
      video.play().catch(() => {});
      show();
    };
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });

    // Resume video after screen wake / tab refocus
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(posterFallback);
      video.removeEventListener("playing", show);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-ink">
      {/* Video background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.webp"
        preload="auto"
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
