import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Calendar, Check } from "lucide-react";
import { useEffect } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[70]"
    />
  );
}

export function FloatingActions({ onBookTour }: { onBookTour: () => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <button
        type="button"
        onClick={onBookTour}
        className="hidden sm:inline-flex cursor-pointer items-center gap-2 h-12 px-5 rounded-full bg-charcoal text-primary-foreground shadow-lg hover:scale-[1.03] transition-transform"
      >
        <Calendar className="w-4 h-4" /> Book Tour
      </button>
    </div>
  );
}

export function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDone, 4_200);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] glass rounded-full px-5 py-3 text-sm shadow-xl flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-accent" /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
