


"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Link from "next/link";
import { TMedia } from "@/types/item";


interface MediaProps {
  media: TMedia;
}

const Media: React.FC<MediaProps> = ({ media }) => {
  const { id, title, image } = media;

  return (
    <Card className="w-full lg:w-[320px] sm:w-[350px] bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-md">
          <Image
            src={image}
            alt="item"
            fill
            className="h-full w-full object-cover rounded-md"
          />
        </AspectRatio>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className=" text-gray-600 text-sm ">
        {/* <p><span className="font-semibold">Category:</span> {category}</p>
        <p><span className="font-semibold">Condition:</span> {condition}</p>
        <p><span className="font-semibold">Price:</span> ${price}</p> */}
        
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="flex justify-between items-center w-full">
       
        <Link href={`/all-medias/${id}`}>
          <Button variant="outline" className="w-full sm:w-auto">
            View Details
          </Button>
        </Link>
        </div>
      
        
      </CardFooter>
    </Card>
  );
};

export default Media;

