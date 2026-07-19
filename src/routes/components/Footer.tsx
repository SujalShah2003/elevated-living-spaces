import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center py-2"><span className="font-display text-2xl font-semibold tracking-tight text-white">MAISON RIVE</span></div>
          <p className="mt-4 text-sm text-white/60 max-w-xs">Luxury rental living, thoughtfully designed for the way you actually live.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#suites" className="text-white/70 hover:text-white">Suites</a></li>
            <li><a href="#amenities" className="text-white/70 hover:text-white">Amenities</a></li>
            <li><a href="#gallery" className="text-white/70 hover:text-white">Gallery</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Maison Rive</li>
            <li>hello@maisonrive.ca</li>
            <li>(905) 555-0184</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Newsletter</div>
          <p className="mt-4 text-sm text-white/70">Availability updates, one email a month.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
            <Input type="email" required placeholder="Email address" className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full" />
            <Button type="submit" className="h-11 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">Join</Button>
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
