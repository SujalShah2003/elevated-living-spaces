import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";
import Reveal from "./Reveal";

const slides = [suite1, suite2, suite3];

export default function HouseTour() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((index) => (index + 1) % slides.length);
  const previous = () => setCurrent((index) => (index - 1 + slides.length) % slides.length);

  return (
    <section id="tour" className="py-28 lg:py-40 bg-secondary/30 text-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="max-w-lg">
            <h2 className="font-display text-4xl lg:text-6xl text-[#1b3322] font-semibold leading-[1.05]">
              More Space.
              <br />
              More Value.
            </h2>
            <div className="mt-8 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Maison Rive, every residence is a testament to thoughtful design and meticulous
                planning.
              </p>
              <p>
                Each suite provides a spacious open-concept floor plan that maximizes both space and
                natural light, reflecting the surrounding natural splendour and giving you room to
                prosper.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-10 inline-flex cursor-pointer items-center justify-center bg-[#f04f23] text-white px-8 h-14 rounded-full font-medium shadow-md hover:bg-[#d83f15] hover:scale-[1.02] transition-all"
            >
              Take a Virtual Tour <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={slides[current]}
                alt={`House tour slide ${current + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={previous}
                className="h-12 w-12 cursor-pointer rounded-full bg-white/95 text-charcoal shadow-lg hover:scale-110 pointer-events-auto transition-transform flex items-center justify-center"
                aria-label="Previous slide"
              >
                <ChevronDown className="w-5 h-5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-12 w-12 cursor-pointer rounded-full bg-white/95 text-charcoal shadow-lg hover:scale-110 pointer-events-auto transition-transform flex items-center justify-center"
                aria-label="Next slide"
              >
                <ChevronDown className="w-5 h-5 -rotate-90" />
              </button>
            </div>
            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`cursor-pointer h-2 rounded-full transition-all ${index === current ? "w-6 bg-[#f04f23]" : "w-2 bg-white/60 hover:bg-white"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
