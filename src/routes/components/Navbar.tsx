import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar({ onBookTour }: { onBookTour: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nav = [
    { label: "Suites", href: "#suites" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Neighborhood", href: "#neighborhood" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 pb-5",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between rounded-2xl transition-all duration-500",
            scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]" : "bg-transparent",
          )}
        >
          <a href="/" className="flex cursor-pointer items-center gap-2 py-2">
            <div className="h-8 w-8 rounded-full bg-charcoal flex items-center justify-center">
              <span className="font-display text-primary-foreground text-sm">M</span>
            </div>
            <span className="font-display text-lg tracking-tight">Maison Rive</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="cursor-pointer text-foreground/70 hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              onClick={onBookTour}
              className="hidden sm:inline-flex rounded-full h-10 px-5 bg-charcoal text-primary-foreground hover:bg-charcoal/90"
            >
              Book a Tour <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden cursor-pointer p-2 rounded-full glass"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg flex flex-col p-6"
          >
            <div className="flex justify-between items-center">
              <span className="font-display text-lg">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full border"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-4xl tracking-tight"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <Button
              onClick={() => {
                setOpen(false);
                onBookTour();
              }}
              className="mt-auto rounded-full h-14 bg-charcoal text-primary-foreground"
            >
              Book a Tour
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
