import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import amenityImg from "@/assets/amenity.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const lifestyle = [
  {
    tag: "Work",
    title: "A home that works as hard as you do.",
    body: "Every suite includes a dedicated desk nook, gigabit fibre, and a bookable co-working lounge on the mezzanine.",
    image: lifestyle1,
  },
  {
    tag: "Family",
    title: "Room to grow, together.",
    body: "Two- and three-bedroom layouts, a playroom, and rooftop gardens that turn ordinary evenings into memories.",
    image: lifestyle2,
  },
  {
    tag: "Community",
    title: "Neighbours you'll actually know.",
    body: "Curated events, resident-only supper clubs, and shared studios for makers, cyclists, and creatives.",
    image: amenityImg,
  },
];

export default function Lifestyle() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-28 lg:space-y-40">
        {lifestyle.map((item, index) => {
          const reversed = index % 2 === 1;
          return (
            <div
              key={item.title}
              className={cn(
                "grid lg:grid-cols-2 gap-10 lg:gap-20 items-center",
                reversed && "lg:[&>*:first-child]:order-2",
              )}
            >
              <Reveal y={40}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="max-w-lg">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent">{item.tag}</span>
                  <h3 className="mt-4 font-display text-4xl lg:text-5xl tracking-tight leading-[1.05] text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{item.body}</p>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex cursor-pointer items-center gap-2 text-sm font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
                  >
                    Explore this lifestyle <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
