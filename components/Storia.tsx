"use client";

import { motion } from "framer-motion";
import config from "@/config/restaurant";

const chapters = [
  {
    n: "01",
    title: "Klassische Kneipe, ohne Schnickschnack",
    body: "Das Süppchen ist eine traditionelle Kneipe, wie es sie immer seltener gibt. Hier zählt nicht die Inszenierung, sondern das Getränk in der Hand, die Musik im Hintergrund und das Gespräch am Tresen."
  },
  {
    n: "02",
    title: "Tresen, Musik, Geselligkeit",
    body: "Ein Holztresen, gut sortierte Flaschen, ein Fernseher über der Bar. Gäste kommen für ein Bier nach Feierabend, bleiben für die Musik und gehen erst, wenn das letzte Glas leer ist."
  },
  {
    n: "03",
    title: "Mitten im Lindenhof",
    body: "Die Meerfeldstraße 24 liegt im Herzen des Lindenhofs. Eine Adresse für Nachbarn, Stammgäste und alle, die in Mannheim eine echte Kneipe statt einer Bar suchen."
  }
];

export function Storia() {
  return (
    <section id="geschichte" className="relative bg-creme py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="marker" />
              <span>Geschichte</span>
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="break-words font-display text-[32px] leading-[1.05] tracking-tight text-ink sm:text-[40px] md:text-[64px] lg:text-[78px]">
              Lindenhofs Kneipe
              <br />
              <span className="italic text-wald-500">in der</span> Meerfeldstraße.
            </h2>
            <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-ink/65">
              Das Süppchen ist die Kneipe für den Alltag im Lindenhof. Ein dunkler Holztresen, gut sortierte Flaschen und ein Personal, das die Stammgäste kennt. Eine willkommene Abwechslung zum hektischen Alltag, wie es ein Gast geschrieben hat.
            </p>
          </div>
        </div>

        {/* Chapters */}
        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-12">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 22, delay: i * 0.08 }}
              className={
                i === 0
                  ? "md:col-span-7 md:col-start-2"
                  : i === 1
                  ? "md:col-span-5 md:col-start-7"
                  : "md:col-span-6 md:col-start-3"
              }
            >
              <div className="flex items-baseline gap-4 border-t border-ink/15 pt-6">
                <span className="font-mono text-[12px] tracking-[0.2em] text-messing-500">
                  {ch.n}
                </span>
                <h3 className="break-words font-display text-[24px] leading-tight tracking-tight text-ink sm:text-[26px] md:text-[32px]">
                  {ch.title}
                </h3>
              </div>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink/60">
                {ch.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
