import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Storia } from "@/components/Storia";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { Galerie } from "@/components/Galerie";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Storia />
      <Galerie />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  );
}
