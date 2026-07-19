import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Bath, BedDouble, Calendar, Check, ChevronDown,
  Heart, Leaf, MapPin, Menu, MessageCircle, Minus, PawPrint,
  Phone, Plus, Search, Star, Wifi, Zap, X, Sparkles, Wind, ParkingCircle, Dumbbell, Package,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import amenityImg from "@/assets/amenity.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://maison-rive.example/og.jpg" },
    ],
  }),
  component: Home,
});

// ------- Data -------

const nav = [
  { label: "Suites", href: "#suites" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Neighborhood", href: "#neighborhood" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: 218, suffix: "", label: "Curated suites" },
  { value: 95, suffix: "%", label: "Currently leased" },
  { value: 1, suffix: "Gbps", label: "Fibre included" },
  { value: 24, suffix: "/7", label: "Concierge" },
];

type Suite = {
  id: string;
  name: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  balcony: boolean;
  petFriendly: boolean;
  available: string;
  status: "Available" | "Few Left" | "Waitlist";
};

const suites: Suite[] = [
  { id: "s1", name: "The Rive Loft",  image: suite1, beds: 1, baths: 1, sqft: 712,  price: 2450, balcony: true,  petFriendly: true,  available: "Immediate", status: "Available" },
  { id: "s2", name: "Sage Two-Bed",   image: suite2, beds: 2, baths: 2, sqft: 1104, price: 3395, balcony: true,  petFriendly: true,  available: "Feb 2026",  status: "Few Left" },
  { id: "s3", name: "Marble Kitchen", image: suite3, beds: 2, baths: 2, sqft: 985,  price: 3120, balcony: false, petFriendly: true,  available: "Mar 2026",  status: "Available" },
  { id: "s4", name: "Corner Studio",  image: suite1, beds: 0, baths: 1, sqft: 548,  price: 1895, balcony: true,  petFriendly: false, available: "Immediate", status: "Few Left" },
  { id: "s5", name: "Skyline Three",  image: suite2, beds: 3, baths: 2, sqft: 1420, price: 4280, balcony: true,  petFriendly: true,  available: "Apr 2026",  status: "Waitlist" },
  { id: "s6", name: "Garden Suite",   image: suite3, beds: 1, baths: 1, sqft: 795,  price: 2620, balcony: true,  petFriendly: true,  available: "Immediate", status: "Available" },
];

const features = [
  { icon: Wind,           title: "Geothermal heating",  desc: "Whisper-quiet climate powered by the earth." },
  { icon: Wifi,           title: "1 Gbps fibre",        desc: "Included in every lease. No contracts." },
  { icon: Zap,            title: "EV charging",         desc: "Level-2 stations across underground parking." },
  { icon: Dumbbell,       title: "Fitness centre",      desc: "Peloton, Technogym, private yoga studio." },
  { icon: PawPrint,       title: "Pet friendly",        desc: "On-site washing station and dog run." },
  { icon: ParkingCircle,  title: "Underground parking", desc: "Heated, monitored, direct-elevator access." },
  { icon: Package,        title: "Smart parcel lockers",desc: "24/7 refrigerated and standard delivery." },
  { icon: Leaf,           title: "Green rooftop",       desc: "Two acres of terraces and edible gardens." },
];

const lifestyle = [
  { tag: "Work",       title: "A home that works as hard as you do.", body: "Every suite includes a dedicated desk nook, gigabit fibre, and a bookable co-working lounge on the mezzanine.", image: lifestyle1 },
  { tag: "Family",     title: "Room to grow, together.",              body: "Two- and three-bedroom layouts, a playroom, and rooftop gardens that turn ordinary evenings into memories.",  image: lifestyle2 },
  { tag: "Community",  title: "Neighbours you'll actually know.",     body: "Curated events, resident-only supper clubs, and shared studios for makers, cyclists, and creatives.",         image: amenityImg  },
];

const neighborhood = [
  { name: "Trillium Park",       type: "Green space",  time: "4 min walk" },
  { name: "Queenston Station",   type: "Transit",      time: "6 min walk" },
  { name: "Maison Bakery",       type: "Café",         time: "2 min walk" },
  { name: "Riverside Public",    type: "School",       time: "8 min walk" },
  { name: "The Market Hall",     type: "Grocery",      time: "5 min walk" },
  { name: "Northshore Trails",   type: "Cycling",      time: "3 min bike" },
];

const reviews = [
  { name: "Ava Martin",    role: "Resident, 2 yrs", stars: 5, quote: "It's the light. Floor-to-ceiling windows, that perfect morning glow — I actually look forward to Mondays now." },
  { name: "Daniel Chen",   role: "Resident, 1 yr",  stars: 5, quote: "The concierge team knows my dog by name. Small details, done properly. Feels less like renting and more like belonging." },
  { name: "Priya Kapoor",  role: "Resident, 3 yrs", stars: 5, quote: "I've toured everything from downtown highrises to boutique conversions. Nothing else came close on finish or service." },
];

const faqs = [
  { q: "What's included in the monthly rent?",     a: "1 Gbps fibre internet, geothermal heating and cooling, access to every amenity, and 24/7 concierge. Only hydro and your parking stall are extra." },
  { q: "Do you allow pets?",                        a: "Yes, with no additional pet rent. We have an on-site dog run, washing station, and a resident-run pet social every Sunday." },
  { q: "Can I tour a suite before applying?",       a: "Absolutely. In-person and virtual tours are available seven days a week. Most residents book in under two minutes." },
  { q: "What lease terms do you offer?",            a: "Standard 12-month leases, with 6 and 18-month options subject to availability. Month-to-month renewals after the first term." },
  { q: "Is parking available?",                     a: "Yes — heated underground parking with EV charging. Stalls are $185/month and reserved on a first-come basis." },
];

// ------- Small helpers -------

function useCounter(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function Reveal({ children, delay = 0, y = 24, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ------- Sections -------

function Navbar({ onBookTour }: { onBookTour: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className={cn(
          "mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between rounded-2xl transition-all duration-500",
          scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]" : "bg-transparent"
        )}>
          <a href="#top" className="flex items-center gap-2 py-2">
            <div className="h-8 w-8 rounded-full bg-charcoal flex items-center justify-center">
              <span className="font-display text-primary-foreground text-sm">M</span>
            </div>
            <span className="font-display text-lg tracking-tight">Maison Rive</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-foreground/70 hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={onBookTour} className="hidden sm:inline-flex rounded-full h-10 px-5 bg-charcoal text-primary-foreground hover:bg-charcoal/90">
              Book a Tour <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-full glass" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg flex flex-col p-6"
          >
            <div className="flex justify-between items-center">
              <span className="font-display text-lg">Menu</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full border" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-4xl tracking-tight"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <Button onClick={() => { setOpen(false); onBookTour(); }} className="mt-auto rounded-full h-14 bg-charcoal text-primary-foreground">
              Book a Tour
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero({ onBookTour }: { onBookTour: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const statsInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Maison Rive at golden hour"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="mx-auto max-w-7xl w-full px-5 lg:px-8 flex-1 flex flex-col justify-end pb-24 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex self-start items-center gap-2 rounded-full glass-dark px-4 py-2 text-white/90 text-xs uppercase tracking-[0.2em]"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Now leasing · From $1,895/mo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-white font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-balance"
          >
            Luxury rental living<br />
            <span className="italic text-white/80">designed around you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 max-w-xl text-white/80 text-lg"
          >
            218 architect-designed suites. Hotel-grade amenities. A neighbourhood you'll never want to leave.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button onClick={onBookTour} size="lg" className="rounded-full h-14 px-8 text-base bg-white text-charcoal hover:bg-white/90 hover:scale-[1.02] transition-transform">
              Book a Tour <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
              <a href="#suites">View Suites</a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="border-t border-white/15 backdrop-blur-md bg-black/20"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => {
              const v = useCounter(s.value, statsInView, 1600 + i * 100);
              return (
                <div key={s.label} className="py-6 lg:py-8 px-4 first:pl-0">
                  <div className="font-display text-white text-3xl lg:text-5xl tracking-tight">
                    {v}<span className="text-accent">{s.suffix}</span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/60">{s.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Finder({ onFilter }: { onFilter: (f: FinderState) => void }) {
  const [state, setState] = useState<FinderState>({
    beds: "any", baths: "any", maxPrice: 5000, balcony: false, pets: false,
  });
  useEffect(() => { onFilter(state); }, [state, onFilter]);

  return (
    <section className="relative -mt-16 z-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="glass rounded-3xl p-6 lg:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Search className="w-4 h-4" /> Find your suite
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Select label="Bedrooms" value={String(state.beds)} onChange={(v) => setState({ ...state, beds: v === "any" ? "any" : Number(v) })}
                options={[["any", "Any"], ["0", "Studio"], ["1", "1"], ["2", "2"], ["3", "3+"]]} />
              <Select label="Bathrooms" value={String(state.baths)} onChange={(v) => setState({ ...state, baths: v === "any" ? "any" : Number(v) })}
                options={[["any", "Any"], ["1", "1"], ["2", "2+"]]} />
              <div className="col-span-2 lg:col-span-2">
                <div className="text-xs text-muted-foreground mb-1.5">Max rent · ${state.maxPrice.toLocaleString()}</div>
                <input type="range" min={1800} max={5000} step={50} value={state.maxPrice}
                  onChange={(e) => setState({ ...state, maxPrice: Number(e.target.value) })}
                  className="w-full accent-[color:var(--accent)]" />
              </div>
              <Toggle label="Balcony" active={state.balcony} onToggle={() => setState({ ...state, balcony: !state.balcony })} />
              <Toggle label="Pet friendly" active={state.pets} onToggle={() => setState({ ...state, pets: !state.pets })} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FinderState = { beds: number | "any"; baths: number | "any"; maxPrice: number; balcony: boolean; pets: boolean };

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1 relative">
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-full border border-border bg-background px-4 h-11 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40">
          {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
      </div>
    </label>
  );
}

function Toggle({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={cn(
        "self-end rounded-full h-11 px-4 text-sm border transition-all flex items-center justify-center gap-2",
        active ? "bg-charcoal text-primary-foreground border-charcoal" : "bg-background border-border hover:border-foreground/40"
      )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-accent" : "bg-muted-foreground/40")} />
      {label}
    </button>
  );
}

function Suites({ filter }: { filter: FinderState }) {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const filtered = useMemo(() => suites.filter((s) =>
    (filter.beds === "any" || s.beds === filter.beds) &&
    (filter.baths === "any" || s.baths >= (filter.baths as number)) &&
    s.price <= filter.maxPrice &&
    (!filter.balcony || s.balcony) &&
    (!filter.pets || s.petFriendly)
  ), [filter]);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <section id="suites" className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured suites</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight max-w-2xl">
                Six ways to live<br /><span className="italic text-muted-foreground">exceptionally well.</span>
              </h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {filtered.length} of {suites.length} suites match your filters
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.article
                key={s.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <StatusBadge status={s.status} />
                  </div>
                  <button onClick={() => toggleSave(s.id)}
                    className="absolute top-4 right-4 h-10 w-10 rounded-full glass grid place-items-center hover:scale-110 transition-transform"
                    aria-label="Save">
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
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {s.available}
                    </span>
                    <Button size="sm" className="rounded-full bg-charcoal text-primary-foreground hover:bg-charcoal/90">
                      Book tour <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center py-20 border border-dashed border-border rounded-3xl">
            <Sparkles className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="mt-3 font-display text-2xl">No suites match those filters.</p>
            <p className="text-muted-foreground text-sm mt-1">Try widening your budget or removing an option.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: Suite["status"] }) {
  const styles: Record<Suite["status"], string> = {
    Available: "bg-accent/95 text-accent-foreground",
    "Few Left": "bg-amber-500/95 text-white",
    Waitlist:  "bg-charcoal/90 text-primary-foreground",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", styles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Features() {
  return (
    <section id="amenities" className="py-28 lg:py-40 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Maison Rive</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
                Amenities that quietly<br /><span className="italic text-muted-foreground">raise the standard.</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              Every detail — from the geothermal HVAC to the smart parcel lockers — was chosen so daily life feels a little more considered.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group h-full bg-background rounded-3xl p-6 border border-border/50 hover:border-accent/60 hover:shadow-lg transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-6 font-display text-xl tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lifestyle() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-28 lg:space-y-40">
        {lifestyle.map((l, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={l.title} className={cn("grid lg:grid-cols-2 gap-10 lg:gap-20 items-center", reversed && "lg:[&>*:first-child]:order-2")}>
              <Reveal y={40}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <motion.img
                    src={l.image} alt={l.title} loading="lazy"
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
                  <span className="text-xs uppercase tracking-[0.2em] text-accent">— {l.tag}</span>
                  <h3 className="mt-4 font-display text-4xl lg:text-5xl tracking-tight leading-[1.05] text-balance">{l.title}</h3>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{l.body}</p>
                  <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors">
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

function Gallery() {
  const images = [suite1, lifestyle2, suite2, amenityImg, suite3, lifestyle1];
  const spans = ["row-span-2", "", "", "row-span-2", "", ""];
  return (
    <section id="gallery" className="py-28 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Gallery</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">A closer look.</h2>
            <p className="mt-4 text-muted-foreground">Every angle, every finish — captured in natural light.</p>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 auto-rows-[220px] lg:auto-rows-[260px] gap-4">
          {images.map((src, i) => (
            <Reveal key={i} delay={i * 0.05} className={cn("relative overflow-hidden rounded-2xl group", spans[i])}>
              <img src={src} alt="" loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Neighborhood() {
  return (
    <section id="neighborhood" className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Neighborhood</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
              The best of the city,<br /><span className="italic text-muted-foreground">a short walk away.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Green corridors, transit, independent cafés and top-rated schools — all within a few minutes of your front door.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {neighborhood.map((n) => (
                <div key={n.name} className="rounded-2xl border border-border/60 p-4 hover:bg-secondary/60 transition-colors">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-accent">
                    <MapPin className="w-3.5 h-3.5" /> {n.type}
                  </div>
                  <div className="mt-2 font-display text-lg">{n.name}</div>
                  <div className="text-sm text-muted-foreground">{n.time}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[420px] rounded-3xl overflow-hidden border border-border/60">
            <img src={amenityImg} alt="Neighborhood map" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-background/50 to-background/80" />
            {/* Faux map pins */}
            {[
              { top: "22%", left: "34%", label: "Trillium Park" },
              { top: "48%", left: "58%", label: "Maison Rive" },
              { top: "70%", left: "28%", label: "The Market" },
              { top: "35%", left: "72%", label: "Station" },
            ].map((p) => (
              <motion.div
                key={p.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: p.top, left: p.left }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
                  <div className="relative h-4 w-4 rounded-full bg-accent border-2 border-background" />
                </div>
                <div className="mt-2 glass rounded-full px-3 py-1 text-xs whitespace-nowrap">{p.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-28 lg:py-40 bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Resident stories</div>
          <div className="relative mt-10 min-h-[280px] lg:min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center gap-1 text-accent">
                  {Array.from({ length: reviews[idx].stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 font-display text-2xl lg:text-4xl italic leading-tight text-balance">
                  "{reviews[idx].quote}"
                </p>
                <div className="mt-8 text-sm">
                  <div className="font-medium">{reviews[idx].name}</div>
                  <div className="text-white/60">{reviews[idx].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Review ${i + 1}`}
                className={cn("h-1.5 rounded-full transition-all", i === idx ? "w-8 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/60")}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const filtered = faqs.filter((f) =>
    f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section id="faq" className="py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Answers</div>
          <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">Frequently asked.</h2>
          <div className="mt-8 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="pl-11 h-12 rounded-full border-border bg-background" />
          </div>
        </Reveal>
        <div className="mt-10 divide-y divide-border">
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="py-2">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left py-5 group"
                >
                  <span className="font-display text-xl lg:text-2xl group-hover:text-accent transition-colors">{f.q}</span>
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
                      <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">No matches — try a different search.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Contact({ toastRef }: { toastRef: React.MutableRefObject<((msg: string) => void) | null> }) {
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.date) errs.date = "Choose a preferred date";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      toastRef.current?.("Tour request received — we'll be in touch within one business day.");
      setForm({ name: "", email: "", date: "", message: "" });
    }
  };
  return (
    <section id="contact" className="py-28 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Book a tour</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
              Come see it<br /><span className="italic text-muted-foreground">in person.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Private tours are available seven days a week. Tell us when works and our leasing team will confirm within one business day.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent" /> (905) 555-0184</div>
              <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-accent" /> hello@maisonrive.ca</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> 870 Queenston Rd · Open 9–7 daily</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="bg-background rounded-3xl p-6 lg:p-10 border border-border/50 space-y-5">
            <div>
              <label className="text-xs text-muted-foreground">Full name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 h-12 rounded-xl" placeholder="Jane Doe" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 h-12 rounded-xl" placeholder="jane@example.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Preferred date</label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 h-12 rounded-xl" />
              {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Anything we should know?</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 rounded-xl min-h-28" placeholder="Suite preferences, questions, timing…" />
            </div>
            <Button type="submit" size="lg" className="w-full h-14 rounded-full bg-charcoal text-primary-foreground hover:bg-charcoal/90">
              Request my tour <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-foreground flex items-center justify-center">
              <span className="font-display text-charcoal text-sm">M</span>
            </div>
            <span className="font-display text-lg">Maison Rive</span>
          </div>
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            Luxury rental living, thoughtfully designed for the way you actually live.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="text-white/70 hover:text-white">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>870 Queenston Rd</li>
            <li>hello@maisonrive.ca</li>
            <li>(905) 555-0184</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Newsletter</div>
          <p className="mt-4 text-sm text-white/70">Availability updates, one email a month.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
            <Input type="email" required placeholder="Email address"
              className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full" />
            <Button type="submit" className="h-11 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              Join
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-wrap gap-3 justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} Maison Rive. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[70]"
    />
  );
}

function FloatingActions({ onBookTour }: { onBookTour: () => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <button
        aria-label="WhatsApp"
        className="h-12 w-12 rounded-full bg-accent text-accent-foreground shadow-lg grid place-items-center hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
      <button
        onClick={onBookTour}
        className="hidden sm:inline-flex items-center gap-2 h-12 px-5 rounded-full bg-charcoal text-primary-foreground shadow-lg hover:scale-[1.03] transition-transform"
      >
        <Calendar className="w-4 h-4" /> Book Tour
      </button>
    </div>
  );
}

function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [message, onDone]);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] glass rounded-full px-5 py-3 text-sm shadow-xl flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-accent" /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ------- Root -------

function Home() {
  const [filter, setFilter] = useState<FinderState>({ beds: "any", baths: "any", maxPrice: 5000, balcony: false, pets: false });
  const [toast, setToast] = useState<string | null>(null);
  const toastRef = useRef<((msg: string) => void) | null>(null);
  toastRef.current = (m) => setToast(m);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <ScrollProgress />
      <Navbar onBookTour={scrollToContact} />
      <main>
        <Hero onBookTour={scrollToContact} />
        <Finder onFilter={setFilter} />
        <Suites filter={filter} />
        <Features />
        <Lifestyle />
        <Gallery />
        <Neighborhood />
        <Reviews />
        <Faq />
        <Contact toastRef={toastRef} />
      </main>
      <Footer />
      <FloatingActions onBookTour={scrollToContact} />
      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
