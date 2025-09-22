import { HomeIcon, SettingsIcon, SparklesIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../../../../ui/avatar";
import { Button } from "../../../../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../ui/navigation-menu";

export const TravelPlanningSection = () => {
  const navigationItems = [
    {
      label: "HOME",
      icon: HomeIcon,
      href: "#home",
    },
    {
      label: "FOR YOU",
      icon: SparklesIcon,
      href: "#for-you",
    },
    {
      label: "COMMUNITY",
      icon: UsersIcon,
      href: "#community",
    },
    {
      label: "PREFERENCES",
      icon: SettingsIcon,
      href: "#preferences",
    },
  ];

  return (
    <header className="relative w-full bg-white border-b translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="flex items-center justify-between px-4 py-4 max-w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Avatar className="w-[62px] h-[62px]">
            <AvatarImage
              src="https://c.animaapp.com/mftt3g6equO0vz/img/ellipse-2.png"
              alt="Via Migo Logo"
              className="object-cover"
            />
          </Avatar>

          <div className="flex items-baseline">
            <span className="[font-family:'Averia_Serif_Libre',Helvetica] font-normal text-[#5fb686] text-[35px] tracking-[0] leading-[normal]">
              Via
            </span>
            <span className="[font-family:'Averia_Serif_Libre',Helvetica] font-normal text-[#0a0a07] text-[35px] tracking-[0] leading-[normal] [-webkit-text-stroke:1px_#000000]">
              Migo
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <NavigationMenuList className="flex items-center gap-8">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.href}
                    className="flex items-center gap-2 [font-family:'Averia_Serif_Libre',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal] hover:text-[#5fb686] transition-colors duration-200"
                  >
                    <IconComponent className="w-9 h-9" />
                    <span>{item.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <Button
          className="bg-[#4bba7c] hover:bg-[#3da066] text-white rounded-full px-8 py-4 h-[59px] min-w-[200px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] transition-colors duration-200"
          size="lg"
        >
          <span className="[font-family:'Averia_Serif_Libre',Helvetica] font-normal text-2xl">
            Get Started
          </span>
        </Button>
      </div>
    </header>
  );
};
