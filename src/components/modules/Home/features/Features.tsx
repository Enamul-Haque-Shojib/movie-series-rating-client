import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HighestRatedMovie from "./HighestRatedMovie";
import HighestRatedSeries from "./HighestRatedSeries";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Features = () => {

  return (
    <div className="lg:w-[85%] w-[95%] mx-auto my-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Highest Rated Movie and Series</h2>
          <Tabs defaultValue="movies">
            <div className='flex justify-between items-center'>
                 <TabsList className="flex gap-4">
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
              </TabsList>
              <Link href='/all-medias'><Button variant='outline'>View All</Button></Link>
            </div>
       

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
