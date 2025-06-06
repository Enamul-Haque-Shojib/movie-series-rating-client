import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import TopRated from './TopRated';
import NewlyAdded from './NewlyAdded';
import EditorPicked from './EditorPicked';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const QuickAccess = () => {

    return (
        <div className='lg:w-[85%] w-[95%] mx-auto my-12'>
            <h2 className="text-2xl font-semibold mb-4 text-center">Quick Access</h2>
                  <Tabs defaultValue="top-rated">
                    <div className='flex justify-between items-center'>
                      <TabsList className="flex gap-4">
                    <TabsTrigger value="top-rated">Top Rated This Week</TabsTrigger>
                    <TabsTrigger value="newly-added">Newly Added</TabsTrigger>
                    <TabsTrigger value="editor-picked">Editor`s Picked</TabsTrigger>
                    
                  </TabsList>
                  <Link href='/all-medias'><Button variant='outline'>View All</Button></Link>
              </div>
        

        <TabsContent value="top-rated">
          <TopRated></TopRated>
        </TabsContent>

        <TabsContent value="newly-added">
          <NewlyAdded></NewlyAdded>
        </TabsContent>
       
        <TabsContent value="editor-picked">
          <EditorPicked></EditorPicked>
        </TabsContent>

      </Tabs>
        </div>
    );
};

export default QuickAccess;