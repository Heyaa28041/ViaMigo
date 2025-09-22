import React from "react";
import { Button } from "@/components/ui/button";

export const StayUpdatedSection = () => {
  return (
    <section className="w-full bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] [font-family:'Poppins',Helvetica] font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-normal mb-6">
          Ready to Start Your Journey?
        </h2>

        <p className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] [font-family:'Poppins',Helvetica] font-normal text-[#ffffffcc] text-lg md:text-2xl lg:text-3xl tracking-[0] leading-normal mb-12 max-w-5xl mx-auto">
          Join thousands of travelers who trust ViaMigo for their adventures
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] h-auto bg-[#5fb686] hover:bg-[#4fa574] text-black [font-family:'Poppins',Helvetica] font-medium text-2xl md:text-3xl lg:text-4xl px-8 py-4 rounded-[30px] min-w-[280px] md:min-w-[328px]">
            Get Started
          </Button>

          <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] h-auto bg-[#5fb686] hover:bg-[#4fa574] text-black [font-family:'Poppins',Helvetica] font-medium text-2xl md:text-3xl lg:text-4xl px-8 py-4 rounded-[30px] min-w-[280px] md:min-w-[324px]">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
