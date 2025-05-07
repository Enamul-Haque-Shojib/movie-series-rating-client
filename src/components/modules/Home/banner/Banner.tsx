'use client'

import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";


const Banner = () => {

 
  return (
    <AspectRatio ratio={16 / 6} className="bg-muted">
      <div
        style={{
          backgroundImage:
            "url('https://yt3.googleusercontent.com/EpteToOMghHwLcRsNalRK3I7YsjdFkcI1J7O2LcRzaHJkAB8jq-4hJLAZ1l07HYOIYoba3Xnog=s900-c-k-c0x00ffffff-no-rj')",
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
            Movie and Series
          </h1>
         
          <p className="text-lg md:text-xl lg:text-2xl font-medium max-w-2xl text-black">
            Secure, fast, and reliable product tracking made effortless. Manage
            your products with ease and confidence.
          </p>
      
        </div>
      </div>
    </AspectRatio>
  );
};

export default Banner;
