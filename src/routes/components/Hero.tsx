import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

export default function Hero({ onBookTour }: { onBookTour: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const statsInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden ">
      <motion.div style={{ y, scale }} className="absolute inset-0 ">
        <img src={heroImg} alt="Maison Rive at golden hour" className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="mx-auto max-w-7xl w-full my-20 px-5 lg:px-8 flex-1 flex flex-col justify-end pb-24 lg:pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="inline-flex self-start items-center gap-2 rounded-full glass-dark px-4 py-2 text-white/90 text-xs uppercase tracking-[0.2em]">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Now leasing · From $1,895/mo
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 text-white font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-balance">
            Luxury rental living<br /><span className="italic text-white/80">designed around you.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-8 max-w-xl text-white/80 text-lg">218 architect-designed suites. Hotel-grade amenities. A neighbourhood you'll never want to leave.</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }} className="mt-10 flex flex-wrap gap-3">
            <Button onClick={onBookTour} size="lg" className="rounded-full h-14 px-8 text-base bg-white text-charcoal hover:bg-white/90 hover:scale-[1.02] transition-transform">Book a Tour <ArrowRight className="ml-2 w-4 h-4" /></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"><a href="#suites">View Suites</a></Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="border-t border-white/15 backdrop-blur-md bg-black/20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {/* stats could be left to parent if needed */}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

