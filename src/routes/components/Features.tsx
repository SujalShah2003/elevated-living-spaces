import { Dumbbell, Leaf, Package, ParkingCircle, PawPrint, Wifi, Wind, Zap } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  { icon: Wind, title: "Geothermal heating", desc: "Whisper-quiet climate powered by the earth." },
  { icon: Wifi, title: "1 Gbps fibre", desc: "Included in every lease. No contracts." },
  { icon: Zap, title: "EV charging", desc: "Level-2 stations across underground parking." },
  { icon: Dumbbell, title: "Fitness centre", desc: "Peloton, Technogym, private yoga studio." },
  { icon: PawPrint, title: "Pet friendly", desc: "On-site washing station and dog run." },
  {
    icon: ParkingCircle,
    title: "Underground parking",
    desc: "Heated, monitored, direct-elevator access.",
  },
  {
    icon: Package,
    title: "Smart parcel lockers",
    desc: "24/7 refrigerated and standard delivery.",
  },
  { icon: Leaf, title: "Green rooftop", desc: "Two acres of terraces and edible gardens." },
];

export default function Features() {
  return (
    <section id="amenities" className="py-28 lg:py-40 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Why Maison Rive
              </div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
                Amenities that quietly
                <br />
                <span className="italic text-muted-foreground">raise the standard.</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              Every detail—from the geothermal HVAC to the smart parcel lockers—was chosen so daily
              life feels a little more considered.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div className="group h-full bg-background rounded-3xl p-6 border border-border/50 hover:border-accent/60 hover:shadow-lg transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-6 font-display text-xl tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
