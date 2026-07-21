import leisureImg from "@/assets/neighborhood-leisure.jpg";
import restaurantsImg from "@/assets/neighborhood-restaurants.jpg";
import shoppingImg from "@/assets/neighborhood-shopping.jpg";
import trailsImg from "@/assets/neighborhood-trails.jpg";
import transitImg from "@/assets/neighborhood-transit.jpg";
import wellnessImg from "@/assets/neighborhood-wellness.jpg";
import Reveal from "./Reveal";

const items = [
  { name: "Shopping & Grocery", image: shoppingImg },
  { name: "Transit & Connectivity", image: transitImg },
  { name: "Trails & Parks", image: trailsImg },
  { name: "Wellness Centres", image: wellnessImg },
  { name: "Leisure & Recreation", image: leisureImg },
  { name: "Restaurants", image: restaurantsImg },
];

export default function Neighborhood() {
  return (
    <section id="neighborhood" className="py-28 lg:py-40 bg-white text-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
              Neighborhood
            </div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight">
              The best of the city,
              <br />
              <span className="italic text-muted-foreground">a short walk away.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Green corridors, transit, independent cafés and top-rated schools—all within a few
              minutes of Maison Rive.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.05}>
              <div className="group flex flex-col items-center">
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 hover:border-accent/50 shadow-lg transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <span className="mt-4 font-display text-lg lg:text-xl text-center text-foreground group-hover:text-accent transition-colors">
                  {item.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
