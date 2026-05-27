"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import config from "@/config/restaurant";

const DAY_FULL = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const DAY_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const RANGES: Record<string, string[]> = {
  "Mo – Fr": ["Mo", "Di", "Mi", "Do", "Fr"],
  "Mo – Sa": ["Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  "Mo – So": DAY_SHORT,
};

function dayMatches(label: string, todayFull: string, todayShort: string) {
  if (label.includes(todayFull)) return true;
  if (RANGES[label]) return RANGES[label].includes(todayShort);
  return label === todayShort;
}

function isTodayInRange(days: string[]) {
  const i = new Date().getDay();
  return days.some((d) => dayMatches(d, DAY_FULL[i], DAY_SHORT[i]));
}

type HoursRow = { label: string; hours: string; days: string[] };

function groupHours(hours: typeof config.openingHours): HoursRow[] {
  const groups: HoursRow[] = [];
  let i = 0;
  while (i < hours.length) {
    let j = i + 1;
    while (j < hours.length && hours[j].hours === hours[i].hours) j++;
    const span = hours.slice(i, j);
    const days = span.map((d) => d.day);
    const label =
      span.length === 1
        ? span[0].day
        : `${span[0].day.slice(0, 2)} – ${span[span.length - 1].day.slice(0, 2)}`;
    groups.push({ label, hours: span[0].hours, days });
    i = j;
  }
  return groups;
}

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedHours = useMemo(() => groupHours(config.openingHours), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    };

    await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-bone">
      {/* Header */}
      <header className="border-b border-ink/10">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-[2px] md:px-10">
          <a href="/" className="group flex items-center gap-3">
            <img
              src="/assets/logo-mark.png"
              alt={`${config.name} Logo`}
              className="h-20 w-20 object-contain md:h-28 md:w-28"
            />
            <span className="hidden font-display text-[18px] tracking-tight text-ink sm:block md:text-[20px]">
              {config.name}
            </span>
          </a>
          <a
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55 transition-colors hover:text-ink"
          >
            &larr; Zurück
          </a>
        </nav>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left label */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="block h-[6px] w-[6px] rotate-45 bg-wald-500" />
              <span>Kontakt</span>
            </div>
          </div>

          {/* Heading */}
          <div className="md:col-span-9">
            <h1 className="break-words font-display text-[28px] leading-[1.05] tracking-tight text-ink sm:text-[36px] md:text-[58px] lg:text-[68px]">
              Schreiben oder
              <br />
              <span className="italic text-wald-500">vorbeischauen.</span>
            </h1>
            <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed text-ink/65 md:text-[17px]">
              Reservierungen nehmen wir keine an, Plätze gibt es bei uns nach dem Prinzip „erst kommt, erst sitzt“. Am schnellsten erreichen Sie uns telefonisch oder direkt am Tresen in der Meerfeldstraße. Für Fragen zu Gruppen, Feiern oder Veranstaltungen nutzen Sie gerne das Formular.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-20 md:grid-cols-12">
          {/* Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="break-words font-display text-[28px] tracking-tight text-ink md:text-[36px]">
                  Vielen Dank.
                </h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink/70">
                  Ihre Nachricht ist bei uns angekommen. Wir melden uns, sobald am Tresen Luft ist.
                </p>
                <a
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-wald-500 transition-colors hover:text-ink"
                >
                  &larr; Zur Startseite
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Name" name="name" type="text" required />
                  <Field label="E-Mail" name="email" type="email" required />
                  <Field label="Telefon (optional)" name="phone" type="tel" />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                    Nachricht
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 md:text-[20px]"
                    placeholder="Anlass, Gruppengröße, Wunschtermin oder Frage ..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-wald-500 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-bone transition-transform active:scale-[0.98] disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading ? "Wird gesendet ..." : "Nachricht senden"}
                  </span>
                  <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                    &rarr;
                  </span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              Direkt erreichen
            </div>
            <a
              href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
              className="mt-4 block break-all font-display text-[24px] tracking-tight text-ink hover:text-wald-500 md:text-[28px]"
            >
              {config.contact.phone}
            </a>
            {config.contact.email && (
              <a
                href={`mailto:${config.contact.email}`}
                className="mt-2 block break-all font-mono text-[14px] text-ink/70 hover:text-wald-500"
              >
                {config.contact.email}
              </a>
            )}

            <div className="mt-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                Adresse
              </div>
              <p className="mt-4 font-display text-[20px] leading-tight tracking-tight text-ink md:text-[22px]">
                {config.address.street}
                <br />
                {config.address.city}
              </p>
              <a
                href={config.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-wald-500 hover:text-ink"
              >
                Auf Karte ansehen <span>&rarr;</span>
              </a>
            </div>

            <div className="mt-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                Öffnungszeiten
              </div>
              <ul className="mt-6 divide-y divide-ink/12">
                {groupedHours.map((row) => {
                  const today = isTodayInRange(row.days);
                  return (
                    <li key={row.label} className="flex items-center justify-between gap-4 py-3">
                      <span className="flex shrink-0 items-center gap-2 font-display text-[18px] tracking-tight text-ink">
                        {today && (
                          <span className="block h-[6px] w-[6px] rounded-full bg-wald-500" />
                        )}
                        {row.label}
                      </span>
                      <span className="min-w-0 break-words text-right font-mono text-[11px] tracking-[0.05em] text-ink/55 sm:text-[12px]">
                        {row.hours}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 md:text-[20px]"
      />
    </div>
  );
}
