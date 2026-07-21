import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "What's included in the monthly rent?",
    a: "1 Gbps fibre internet, geothermal heating and cooling, access to every amenity, and 24/7 concierge. Only hydro and your parking stall are extra.",
  },
  {
    q: "Do you allow pets?",
    a: "Yes, with no additional pet rent. We have an on-site dog run, washing station, and a resident-run pet social every Sunday.",
  },
  {
    q: "Can I tour a suite before applying?",
    a: "Absolutely. In-person and virtual tours are available seven days a week. Most residents book in under two minutes.",
  },
  {
    q: "What lease terms do you offer?",
    a: "Standard 12-month leases, with 6 and 18-month options subject to availability. Month-to-month renewals after the first term.",
  },
  {
    q: "Is parking available?",
    a: "Yes—heated underground parking with EV charging. Stalls are $185/month and reserved on a first-come basis.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return faqs;
    return faqs.filter(
      (faq) => faq.q.toLowerCase().includes(search) || faq.a.toLowerCase().includes(search),
    );
  }, [query]);

  return (
    <section id="faq" className="py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Answers</div>
          <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">
            Frequently asked.
          </h2>
          <div className="mt-8 relative">
            <Search className="pointer-events-none w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions…"
              className="pl-11 h-12 rounded-full border-border bg-background cursor-text text-foreground caret-foreground"
            />
          </div>
        </Reveal>
        <div className="mt-10 divide-y divide-border">
          {filtered.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q} className="py-2">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full cursor-pointer flex items-center justify-between text-left py-5 group"
                >
                  <span className="font-display text-xl lg:text-2xl group-hover:text-accent transition-colors">
                    {faq.q}
                  </span>
                  <span className="ml-4 h-9 w-9 rounded-full border border-border grid place-items-center shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">
              No matches—try a different search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
