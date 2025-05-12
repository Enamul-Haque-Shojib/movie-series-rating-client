'use client'

import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";


const Banner = () => {

 
  return (
    <AspectRatio ratio={16 / 6} className="bg-muted">
      <div
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1696229900387-O1WTJC85L4P45RQURSHB/disney.jpeg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="h-full w-full rounded-lg shadow-md relative"
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 rounded-lg"
        />
        <div>
        
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1
            className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
            }}
          >
            Movie World
          </h1>
         
          <p className="text-lg md:text-xl lg:text-2xl font-medium max-w-2xl text-white">
            Dive into a world of captivating stories, thrilling series, and blockbuster hits. Track what you watch, rate your favorites, and explore what’s trending, all in one place.
          </p>
      
        </div>
      </div>
    </AspectRatio>
  );
};

export default Banner;
