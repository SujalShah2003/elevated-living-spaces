import amenityImg from "@/assets/amenity.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const images = [suite1, lifestyle2, suite2, amenityImg, suite3, lifestyle1];
const spans = ["row-span-2", "", "", "row-span-2", "", ""];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Gallery</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">
              A closer look.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every angle, every finish—captured in natural light.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 auto-rows-[220px] lg:auto-rows-[260px] gap-4">
          {images.map((src, index) => (
            <Reveal
              key={src}
              delay={index * 0.05}
              className={cn("relative overflow-hidden rounded-2xl group", spans[index])}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
