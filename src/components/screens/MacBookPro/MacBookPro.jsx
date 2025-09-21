import React from "react";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { RecommendedForYouSection } from "./sections/RecommendedForYouSection/RecommendedForYouSection";
import { StayUpdatedSection } from "./sections/StayUpdatedSection/StayUpdatedSection";
import { TravelFeaturesSection } from "./sections/TravelFeaturesSection/TravelFeaturesSection";
import { TravelPlanningSection } from "./sections/TravelPlanningSection/TravelPlanningSection";

export const MacbookPro = () => {
  return (
    <main
      className="bg-white overflow-hidden w-full min-w-[1512px] relative"
      data-model-id="24:8"
    >
      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <TravelPlanningSection />
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <HeroSection />
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <TravelFeaturesSection />
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <RecommendedForYouSection />
      </div>

      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
        <StayUpdatedSection />
      </div>
    </main>
  );
};
