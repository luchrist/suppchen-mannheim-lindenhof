const images = [
  {
    src: "/assets/acquisition/restaurant/bar-innenraum-mit-gasten-01.jpg",
    alt: "Blick auf den Holztresen im Süppchen mit Gästen und Flaschenregal im Mannheimer Lindenhof"
  },
  {
    src: "/assets/acquisition/restaurant/bar-innenraum-mit-gasten-02.jpg",
    alt: "Innenraum des Süppchen mit Schankraum, Stammgästen und gedämpfter Beleuchtung"
  }
];

export function Galerie() {
  return (
    <section className="bg-creme py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="marker" />
              <span>Einblicke</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="break-words font-display text-[32px] leading-[1.05] tracking-tight text-ink sm:text-[40px] md:text-[64px] lg:text-[78px]">
              Am Tresen,
              <br />
              <span className="italic text-wald-500">im Schankraum.</span>
            </h2>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={
                i === 0
                  ? "col-span-12 md:col-span-7"
                  : "col-span-12 md:col-span-5"
              }
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-ink/5">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
