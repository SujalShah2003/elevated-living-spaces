import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, BedDouble, Bath, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

export default function ExploreSuites({ suites }: { suites: any[] }) {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const toggleSave = (id: string) => setSaved((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <section id="suites" className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Explore Suites</div>
          <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">Six ways to live<br /><span className="italic text-muted-foreground">exceptionally well.</span></h2>
          <p className="mt-4 text-muted-foreground">Browse our premium floor plans, designed with spacious open concepts and high-end finishes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {suites.map((s, i) => (
            <motion.article key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }} className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4"><StatusBadge status={s.status} /></div>
                <button onClick={() => toggleSave(s.id)} className="absolute top-4 right-4 h-10 w-10 rounded-full glass grid place-items-center hover:scale-110 transition-transform" aria-label="Save">
                  <Heart className={cn("w-4 h-4", saved.has(s.id) ? "fill-destructive text-destructive" : "text-foreground")} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-tight">{s.name}</h3>
                  <div className="text-right">
                    <div className="font-display text-2xl">${s.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground -mt-0.5">/ month</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{s.beds === 0 ? "Studio" : `${s.beds} bed`}</span>
                  <span className="inline-flex items-center gap-1.5"><Bath className="w-4 h-4" />{s.baths}</span>
                  <span>{s.sqft} sqft</span>
                </div>
                <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {s.available}</span>
                  <Button size="sm" className="rounded-full bg-charcoal text-primary-foreground hover:bg-charcoal/90 font-medium">Book tour <ArrowUpRight className="w-3.5 h-3.5 ml-1" /></Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
