import * as React from "react";
import {
  Card,
  CardContent,

} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HighestRatedMovie from "./HighestRatedMovie";
import HighestRatedSeries from "./HighestRatedSeries";


const Features = () => {
  const featured = [
    { title: "Inception", rating: 9.1 },
    { title: "The Last of Us", rating: 8.9 },
  ];
  return (
    <div className="lg:w-[85%] w-[95%] mx-auto my-12">
        <h2 className="text-2xl font-semibold mb-4">Featured : Highest Rated Movie and Series</h2>
          <Tabs defaultValue="movies">
        <TabsList className="flex gap-4">
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
      
          
        </TabsList>

        <TabsContent value="movies">
          <HighestRatedMovie></HighestRatedMovie>
        </TabsContent>

        <TabsContent value="series">
          <HighestRatedSeries></HighestRatedSeries>
        </TabsContent>
       
  

      </Tabs>
       
    </div>
  );
};

export default Features;
