import { CalendarIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";

export const HeroSection = () => {
  return (
    <section className="w-full px-4 translate-y-[-1rem] animate-fade-in opacity-0">
      {/* Hero Content with Background */}
      <div className="relative w-full min-h-[600px] bg-cover bg-center bg-no-repeat rounded-[38px] overflow-hidden" 
           style={{backgroundImage: "url('https://c.animaapp.com/mftt3g6equO0vz/img/rectangle-26.png')"}}>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-[38px]"></div>
        
        {/* Hero Text Content - Left Aligned */}
        <div className="relative z-10 flex flex-col justify-center min-h-[600px] px-12 py-16">
          <div className="max-w-2xl">
            <h1 className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] [font-family:'Poppins',Helvetica] font-bold text-white text-5xl md:text-6xl lg:text-7xl tracking-[0] leading-[1.1] mb-6">
              YOUR NEXT<br />
              ADVENTURE<br />
              AWAITS
            </h1>
            
            <p className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] [font-family:'Poppins',Helvetica] font-normal text-white text-lg md:text-xl lg:text-2xl tracking-[0] leading-[1.4] mb-12 max-w-lg">
              Discover personalized travel experiences with AI-driven itineraries, budget optimization, and local insights that transform your journey into unforgettable memories.
            </p>
          </div>
        </div>
        
        {/* Search Form - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-[25px] p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Where to section */}
              <div className="space-y-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
                <Label className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
                  Where to?
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Search destination"
                    className="bg-[#f5f5f5] border-0 rounded-[15px] h-[45px] [font-family:'Poppins',Helvetica] font-normal text-black text-base placeholder:text-gray-500"
                    defaultValue=""
                  />
                </div>
              </div>

              {/* When section */}
              <div className="space-y-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
                <Label className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
                  When?
                </Label>
                <div className="relative">
                  <Input
                    placeholder="dd-mm-yy"
                    className="bg-[#f5f5f5] border-0 rounded-[15px] h-[45px] pr-12 [font-family:'Poppins',Helvetica] font-normal text-black text-base placeholder:text-gray-500"
                    defaultValue=""
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              {/* Search button section */}
              <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-[15px] h-[45px] px-6 w-full transition-colors">
                  <SearchIcon className="w-5 h-5 mr-2" />
                  <span className="[font-family:'Poppins',Helvetica] font-medium text-base">
                    Search
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
