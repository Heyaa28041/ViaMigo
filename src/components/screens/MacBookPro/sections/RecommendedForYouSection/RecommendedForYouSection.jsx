import { SparklesIcon, StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../ui/badge";
import { Button } from "../../../../ui/button";
import { Card, CardContent } from "../../../../ui/card";

export const RecommendedForYouSection = () => {
  const destinations = [
    {
      id: 1,
      image: "https://c.animaapp.com/mftt3g6equO0vz/img/rectangle-27.png",
      rating: "4.8",
      matchPercentage: "92% Match",
      title: "Mountain Adventure",
      location: "Manali",
      price: "From Rs.10,000",
      tags: ["Adventure", "Nature", "Photography"],
    },
    {
      id: 2,
      image: "https://c.animaapp.com/mftt3g6equO0vz/img/rectangle-27-1.png",
      rating: "4.9",
      matchPercentage: "85% Match",
      title: "Tropical Paradise",
      location: "Lakshadweep",
      price: "From Rs.30,000",
      tags: ["Relaxation", "Beach", "Luxury"],
    },
    {
      id: 3,
      image: "https://c.animaapp.com/mftt3g6equO0vz/img/rectangle-27-2.png",
      rating: "4.8",
      matchPercentage: "92% Match",
      title: "City Break",
      location: "Mumbai",
      price: "From Rs.20,000",
      tags: ["Cultural", "Urban", "Food"],
    },
  ];

  return (
    <section className="w-full overflow-hidden px-6 max-w-7xl mx-auto">
      {/* Heading and Subheading */}
      <div className="mb-10">
        <h3 className="text-3xl font-semibold mb-2 text-black">Recommended for You</h3>
        <p className="text-gray-600 mb-6 text-lg">
          Destinations shortlisted based on your preferences
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        {destinations.map((destination, index) => (
          <Card
            key={destination.id}
            className="flex-shrink-0 w-[618px] h-[664px] bg-white rounded-[23px] shadow-lg translate-y-[-1rem] animate-fade-in opacity-0"
            style={{ "--animation-delay": `${400 + index * 200}ms` }}
          >
            <CardContent className="p-0 h-full flex flex-col">
              <div className="relative">
                <img
                  className="w-full h-[332px] rounded-[23px_23px_0px_0px] object-cover"
                  alt={destination.title}
                  src={destination.image}
                />

                <div className="absolute top-[17px] left-[17px] flex items-center bg-[#d9d9d9] rounded-2xl px-2 py-1 h-5">
                  <StarIcon className="w-[18px] h-[18px] mr-1" />
                  <span className="[font-family:'Poppins',Helvetica] font-semibold text-black text-[10px]">
                    {destination.rating}
                  </span>
                </div>

                <div className="absolute top-[17px] right-[17px] flex items-center bg-[#4bba7c] rounded-2xl px-2 py-1 h-5">
                  <SparklesIcon className="w-[13px] h-[13px] mr-2" />
                  <span className="[font-family:'Poppins',Helvetica] font-semibold text-white text-[10px]">
                    {destination.matchPercentage}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-[22px] flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-3xl mb-4">
                      {destination.title}
                    </h3>
                    <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#00000099] text-[25px]">
                      {destination.location}
                    </p>
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-medium text-black text-xl">
                    {destination.price}
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  {destination.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="h-7 px-4 rounded-[10px] border-[#00000099] bg-transparent"
                    >
                      <span className="[font-family:'Poppins',Helvetica] font-medium text-black text-base">
                        {tag}
                      </span>
                    </Badge>
                  ))}
                </div>

                <Button className="w-full h-[47px] bg-black text-white rounded-[27px] [font-family:'Poppins',Helvetica] font-semibold text-[25px] hover:bg-gray-800 transition-colors">
                  Explore
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
