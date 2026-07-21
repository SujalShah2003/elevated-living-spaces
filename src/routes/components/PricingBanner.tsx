import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Bath, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LargestSuite } from "../home-data";

export default function PricingBanner({ largestSuites }: { largestSuites: LargestSuite[] }) {
  return (
    <section className="py-28 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Largest Suites
          </div>
          <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">
            Home Of The Largest New Rental Suites in Hamilton
          </h2>
          <p className="mt-4 text-muted-foreground">
            Spacious layouts with included heating, cooling, and internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {largestSuites.map((suite, i) => (
            <motion.article
              key={suite.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={suite.image}
                  alt={suite.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  From {suite.price}/month
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tight">{suite.name}</h3>
                  <div className="text-right shrink-0">
                    <div className="font-display text-2xl">{suite.price}</div>
                    <div className="text-xs text-muted-foreground -mt-0.5">/ month</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4" />
                    {suite.beds}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath className="w-4 h-4" />
                    {suite.baths}
                  </span>
                </div>
                <div className="mt-5 pt-5 border-t border-border/60 grid gap-2 text-xs uppercase tracking-wide text-accent font-medium">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Heating Included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Cooling Included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Internet Included
                  </span>
                </div>
                <div className="mt-6">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-charcoal text-primary-foreground hover:bg-charcoal/90 font-medium"
                  >
                    <a href="#contact">
                      Book tour <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
