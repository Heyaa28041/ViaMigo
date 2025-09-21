import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { RecommendedForYouSection } from "./sections/RecommendedForYouSection/RecommendedForYouSection";
import { StayUpdatedSection } from "./sections/StayUpdatedSection/StayUpdatedSection";
import { TravelFeaturesSection } from "./sections/TravelFeaturesSection/TravelFeaturesSection";
import { TravelPlanningSection } from "./sections/TravelPlanningSection/TravelPlanningSection";
import { VideoSection } from "./sections/VideoSection/VideoSection";
import LoginModal from "./sections/LoginModel/LoginModel";
import { Button } from "../../ui/button"; 
import { useNavigate } from "react-router-dom";


export const MacbookPro = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>ViaMigo</title>
        <link rel="icon" href="/logo.png" />
      </Helmet>
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

        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms]">
          <VideoSection />
        </div>

        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <RecommendedForYouSection />
        </div>

        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          <StayUpdatedSection />
        </div>

        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </main>
    </>
  );
};
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="...">
      {/* ... other nav items ... */}
      <Button
        className="bg-gradient-to-r from-[#126738] to-[#004000] rounded-full px-6 py-3 font-semibold text-white shadow-lg hover:brightness-110 transition"
        onClick={() => navigate("/login")}
      >
        Get Started
      </Button>
    </nav>
  );
}