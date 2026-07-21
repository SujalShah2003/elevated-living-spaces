import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const reviews = [
  {
    name: "Ava Martin",
    role: "Resident, 2 yrs",
    stars: 5,
    quote:
      "It's the light. Floor-to-ceiling windows, that perfect morning glow—I actually look forward to Mondays now.",
  },
  {
    name: "Daniel Chen",
    role: "Resident, 1 yr",
    stars: 5,
    quote:
      "The concierge team knows my dog by name. Small details, done properly. Feels less like renting and more like belonging.",
  },
  {
    name: "Priya Kapoor",
    role: "Resident, 3 yrs",
    stars: 5,
    quote:
      "I've toured everything from downtown highrises to boutique conversions. Nothing else came close on finish or service.",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % reviews.length),
      6_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="py-28 lg:py-40 bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Resident stories</div>
          <div className="relative mt-10 min-h-[280px] lg:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center gap-1 text-accent">
                  {Array.from({ length: reviews[index].stars }).map((_, star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 font-display text-2xl lg:text-4xl italic leading-tight text-balance">
                  “{reviews[index].quote}”
                </p>
                <div className="mt-8 text-sm">
                  <div className="font-medium">{reviews[index].name}</div>
                  <div className="text-white/60">{reviews[index].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {reviews.map((review, reviewIndex) => (
              <button
                key={review.name}
                type="button"
                onClick={() => setIndex(reviewIndex)}
                aria-label={`Review ${reviewIndex + 1}`}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all",
                  reviewIndex === index ? "w-8 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/60",
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
