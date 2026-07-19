import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Bath, BedDouble, Calendar, Check, ChevronDown,
  Heart, Leaf, MapPin, Menu, Minus, PawPrint,
  Phone, Plus, Search, Star, Wifi, Zap, X, Wind, ParkingCircle, Dumbbell, Package,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import amenityImg from "@/assets/amenity.jpg";

import shoppingImg from "@/assets/neighborhood-shopping.jpg";
import transitImg from "@/assets/neighborhood-transit.jpg";
import trailsImg from "@/assets/neighborhood-trails.jpg";
import wellnessImg from "@/assets/neighborhood-wellness.jpg";
import leisureImg from "@/assets/neighborhood-leisure.jpg";
import restaurantsImg from "@/assets/neighborhood-restaurants.jpg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PricingBanner from "./components/PricingBanner";
import Footer from "./components/Footer";
import StatusBadge from "./components/StatusBadge";
import ExploreSuites from "./components/ExploreSuites";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Rive   Luxury Rental Living in Hamilton" },
      { name: "description", content: "Discover Maison Rive: premium Hamilton rentals with geothermal heating, EV charging, and exceptional amenities." },
      { property: "og:title", content: "Maison Rive   Luxury Rental Living" },
      { property: "og:description", content: "Luxury suites, thoughtful design, and a connected Hamilton neighbourhood." },
      
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

const largestSuites = [
  { name: "1 Bedroom + Den", beds: "1 bed", baths: "1 bath", price: "$1,999", image: suite1 },
  { name: "2 Bedroom + Den", beds: "2 bed", baths: "2 bath", price: "$2,499", image: suite2 },
  { name: "3 Bedroom + 2 Bathroom", beds: "3 bed", baths: "2 bath", price: "$3,795", image: suite3 },
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

const neighborhoodItems = [
  { name: "Shopping & Grocery", image: shoppingImg },
  { name: "Transit & Connectivity", image: transitImg },
  { name: "Trails & Parks", image: trailsImg },
  { name: "Wellness Centres", image: wellnessImg },
  { name: "Leisure & Recreation", image: leisureImg },
  { name: "Restaurants", image: restaurantsImg },
];

const reviews = [
  { name: "Ava Martin",    role: "Resident, 2 yrs", stars: 5, quote: "It's the light. Floor-to-ceiling windows, that perfect morning glow   I actually look forward to Mondays now." },
  { name: "Daniel Chen",   role: "Resident, 1 yr",  stars: 5, quote: "The concierge team knows my dog by name. Small details, done properly. Feels less like renting and more like belonging." },
  { name: "Priya Kapoor",  role: "Resident, 3 yrs", stars: 5, quote: "I've toured everything from downtown highrises to boutique conversions. Nothing else came close on finish or service." },
];

const faqs = [
  { q: "What's included in the monthly rent?",     a: "1 Gbps fibre internet, geothermal heating and cooling, access to every amenity, and 24/7 concierge. Only hydro and your parking stall are extra." },
  { q: "Do you allow pets?",                        a: "Yes, with no additional pet rent. We have an on-site dog run, washing station, and a resident-run pet social every Sunday." },
  { q: "Can I tour a suite before applying?",       a: "Absolutely. In-person and virtual tours are available seven days a week. Most residents book in under two minutes." },
  { q: "What lease terms do you offer?",            a: "Standard 12-month leases, with 6 and 18-month options subject to availability. Month-to-month renewals after the first term." },
  { q: "Is parking available?",                     a: "Yes   heated underground parking with EV charging. Stalls are $185/month and reserved on a first-come basis." },
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

// Sections have been split into separate files under ./components/
// `Navbar` implemented in ./components/Navbar.tsx

// ------- Sections -------

// `Hero` moved to ./components/Hero.tsx

// `ExploreSuites` moved to ./components/ExploreSuites.tsx

// `StatusBadge` moved to ./components/StatusBadge.tsx

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
              Every detail   from the geothermal HVAC to the smart parcel lockers   was chosen so daily life feels a little more considered.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  <span className="text-xs uppercase tracking-[0.2em] text-accent">  {l.tag}</span>
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
            <p className="mt-4 text-muted-foreground">Every angle, every finish   captured in natural light.</p>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 auto-rows-[220px] lg:auto-rows-[260px] gap-4">
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
    <section id="neighborhood" className="py-28 lg:py-40 bg-white text-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Neighborhood</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">
              The best of the city,<br /><span className="italic text-muted-foreground">a short walk away.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Green corridors, transit, independent cafés and top-rated schools   all within a few minutes of Maison Rive.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {neighborhoodItems.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.05}>
              <div className="group flex flex-col items-center">
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 hover:border-accent/50 shadow-lg transition-all duration-500">
                  <img
                    src={n.image}
                    alt={n.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <span className="mt-4 font-display text-lg lg:text-xl text-center text-foreground group-hover:text-accent transition-colors">
                  {n.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
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
            <p className="py-10 text-center text-muted-foreground">No matches   try a different search.</p>
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
    if (form.message.trim().length < 10) errs.message = "Please enter a brief message";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const subject = encodeURIComponent("Tour request for Maison Rive");
      const body = encodeURIComponent(
        [
          "New tour request:",
          "",
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Preferred date to visit: ${form.date}`,
          "",
          "Message:",
          form.message,
        ].join("\n")
      );
      window.location.href = `mailto:${encodeURIComponent(form.email)}?subject=${subject}&body=${body}`;
      toastRef.current?.("Your email is ready to send.");
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
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> Maison Rive · Open 9–7 daily</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="bg-background rounded-3xl p-6 lg:p-10 border border-border/50 space-y-5">
            <div>
              <label className="text-xs text-muted-foreground">Your Full Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 h-12 rounded-xl" placeholder="Jane Doe" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Your Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 h-12 rounded-xl" placeholder="jane@example.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Preferred Date to Visit</label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 h-12 rounded-xl" />
              {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Message</label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 min-h-[140px] rounded-xl p-3" placeholder="Tell us what you want to see or ask about your visit." />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full h-14 rounded-full bg-charcoal text-primary-foreground hover:bg-charcoal/90">
              Send Email <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

// `Footer` moved to ./components/Footer.tsx

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

function HouseTour() {
  const slides = [suite1, suite2, suite3];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <section id="tour" className="py-28 lg:py-40 bg-secondary/30 text-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="max-w-lg">
            <h2 className="font-display text-4xl lg:text-6xl text-[#1b3322] font-semibold leading-[1.05]">
              More Space.<br />More Value.
            </h2>
            <div className="mt-8 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Maison Rive, every residence is a testament to thoughtful design and meticulous planning.
              </p>
              <p>
                Each suite provides a spacious open-concept floor plan that maximizes both space and natural light, reflecting the surrounding natural splendour and giving you room to prosper.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#f04f23] text-white px-8 h-14 rounded-full font-medium shadow-md hover:bg-[#d83f15] hover:scale-[1.02] transition-all"
              >
                Take a Virtual Tour <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
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

            {/* Arrow Navigation */}
            <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none">
              <button
                onClick={prev}
                className="h-12 w-12 rounded-full bg-white/95 text-charcoal shadow-lg hover:scale-110 pointer-events-auto transition-transform flex items-center justify-center"
                aria-label="Previous slide"
              >
                <ChevronDown className="w-5 h-5 rotate-90" />
              </button>
              <button
                onClick={next}
                className="h-12 w-12 rounded-full bg-white/95 text-charcoal shadow-lg hover:scale-110 pointer-events-auto transition-transform flex items-center justify-center"
                aria-label="Next slide"
              >
                <ChevronDown className="w-5 h-5 -rotate-90" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === current ? "w-6 bg-[#f04f23]" : "w-2 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ------- Root -------

function Home() {
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
        <PricingBanner largestSuites={largestSuites} />
        <ExploreSuites suites={suites} />
        <HouseTour />
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
