import { lazy, Suspense } from "react";
import { suites } from "../home-data";
import ExploreSuites from "./ExploreSuites";
import Faq from "./Faq";
import Features from "./Features";
import Gallery from "./Gallery";
import HouseTour from "./HouseTour";
import Lifestyle from "./Lifestyle";
import Neighborhood from "./Neighborhood";
import Reviews from "./Reviews";

const Contact = lazy(() => import("./Contact"));

export default function MainSections({ notify }: { notify: (message: string) => void }) {
  return (
    <>
      <ExploreSuites suites={suites} />
      <HouseTour />
      <Features />
      <Lifestyle />
      <Gallery />
      <Neighborhood />
      <Reviews />
      <Faq />
      <Suspense
        fallback={
          <div className="min-h-[720px] bg-secondary/40" aria-label="Loading contact form" />
        }
      >
        <Contact notify={notify} />
      </Suspense>
    </>
  );
}
