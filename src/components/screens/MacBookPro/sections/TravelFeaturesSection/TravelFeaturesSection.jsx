import { SparklesIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../ui/card";

export const TravelFeaturesSection = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Planning",
      description:
        "Personalized itineraries based on your preferences and budget",
      delay: "0ms",
    },
    {
      icon: UsersIcon,
      title: "Community Connect",
      description: "Find travel companions and join verified groups",
      delay: "200ms",
    },
    {
      icon: UsersIcon,
      title: "Smart Recommendations",
      description:
        "Get shortlisted places and restaurants tailored to your taste",
      delay: "400ms",
    },
  ];

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] [font-family:'Poppins',Helvetica] font-bold text-black text-4xl md:text-5xl lg:text-6xl tracking-[0] leading-[normal] mb-6">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#45b7d1] bg-clip-text text-transparent">
              Perfect Travel
            </span>
          </h2>
          
          <p className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] [font-family:'Averia_Serif_Libre',Helvetica] font-normal text-[#000000cc] text-xl md:text-2xl lg:text-3xl tracking-[0] leading-[normal] max-w-4xl mx-auto">
            From AI-powered planning to community connections, we've got every aspect of your journey covered
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="translate-y-[-1rem] animate-fade-in opacity-0 bg-white rounded-[39px] border border-solid border-[#00000066] shadow-[0px_4px_80px_#00000040] h-[420px] transition-transform hover:scale-105"
                style={{ "--animation-delay": `${400 + index * 200}ms` }}
              >
                <CardContent className="p-8 h-full flex flex-col items-center text-center">
                  <div className="w-[90px] h-[81px] bg-black rounded-[18px] flex items-center justify-center mb-12">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-3xl tracking-[0] leading-[normal] mb-8 max-w-[350px]">
                    {feature.title}
                  </h3>

                  <p className="[font-family:'Averia_Serif_Libre',Helvetica] font-normal text-[#000000cc] text-2xl tracking-[0] leading-[normal] max-w-[361px]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
