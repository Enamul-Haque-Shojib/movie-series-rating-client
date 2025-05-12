import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getEditorPickedMedia } from '@/services/Statistics';
import { TMedia } from '@/types/item';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const EditorPicked = () => {
   const [editorsPicks, setEditorPicks] = useState<TMedia[]>([]);
  
          useEffect(()=>{
              const getData = async()=>{
                  const res = await getEditorPickedMedia();
                
                  setEditorPicks(res?.data || [])
              }
              getData();
          },[])
    return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {editorsPicks.map((item, i) => (
              <Card key={i} className="rounded-2xl shadow">
                <CardHeader className="p-4">
                  <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-md">
                    <Image

                      src={item.image}
                      alt="item"
                      fill
                      className="h-full w-full object-cover rounded-md"
                    />
                  </AspectRatio>
                
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>{item.genre}</p>
                </CardContent>
                 <div className='flex justify-between items-center'>
                <p className='ml-5'>{item.status}</p>
                <Link className='mr-5' href={`/all-medias/${item.id}`}>
                <Button variant="outline" className="w-full sm:w-auto">
                  View Details
                </Button>
              </Link>
               </div>
              </Card>
            ))}
          </div>
    );
};

export default EditorPicked;