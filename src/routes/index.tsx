import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { FloatingActions, ScrollProgress, Toast } from "./components/PageChrome";
import PricingBanner from "./components/PricingBanner";
import { largestSuites } from "./home-data";

const MainSections = lazy(() => import("./components/MainSections"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Rive — Luxury Rental Living in Hamilton" },
      {
        name: "description",
        content:
          "Discover Maison Rive: premium Hamilton rentals with geothermal heating, EV charging, and exceptional amenities.",
      },
      { property: "og:title", content: "Maison Rive — Luxury Rental Living" },
      {
        property: "og:description",
        content: "Luxury suites, thoughtful design, and a connected Hamilton neighbourhood.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div id="top" className="bg-background text-foreground overflow-x-clip">
      <ScrollProgress />
      <Navbar onBookTour={scrollToContact} />
      <main>
        <Hero onBookTour={scrollToContact} />
        <PricingBanner largestSuites={largestSuites} />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <MainSections notify={setToast} />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions onBookTour={scrollToContact} />
      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
