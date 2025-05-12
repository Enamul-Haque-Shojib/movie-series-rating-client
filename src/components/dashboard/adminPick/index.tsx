/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";


import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { getUserItems } from "@/services/itemService";
// import { toast } from "sonner";

import { TMedia } from "@/types/item";
import Link from "next/link";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { addEditorPickedByAdmin, removeEditorPickedByAdmin } from "@/services/Statistics";


const ManagePicks = () => {
 

  const [items, setItems] = useState<TMedia[]>([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      const res = await getUserItems();
      setItems(res?.data);
    };
    fetchAllItems();
  }, []);

  // const handleAddPicked = async (id: string) => {
  //   try {
  //     const res = await addEditorPickedByAdmin(id);
   
  //     toast.success("Media picked added successfully");
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };
  // const handleRemovePicked = async (id: string) => {
  //   try {
  //     const res = await removeEditorPickedByAdmin(id);
  //  console.log(res)
  //     toast.success("Media picked removed successfully");
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };


  const handleAddPicked = async (id: string) => {
  try {
    await addEditorPickedByAdmin(id);
    toast.success("Media picked added successfully");

    // Update local state
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditorsPick: true } : item
      )
    );
  } catch (error: any) {
    toast.error(error.message);
  }
};

const handleRemovePicked = async (id: string) => {
  try {
    await removeEditorPickedByAdmin(id);
    toast.success("Media picked removed successfully");

    // Update local state
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditorsPick: false } : item
      )
    );
  } catch (error: any) {
    toast.error(error.message);
  }
};


  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Movies and Series</h1>
        
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>A list of your items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Picked</TableHead>
              <TableHead className="w-[50px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>BuyPrice</TableHead>
              <TableHead>RentPrice</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Platform</TableHead>
             
              <TableHead>Status</TableHead>
            
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {
                    item.isEditorsPick == false ? <Checkbox className="cursor-pointer" id="terms" checked={item.isEditorsPick} onCheckedChange={()=>handleAddPicked(item.id as string)} /> :
                    <Checkbox className="cursor-pointer" id="terms" checked={item.isEditorsPick} onCheckedChange={()=>handleRemovePicked(item.id as string)} />
                  }
                        
                        
                       
                </TableCell>
                <TableCell>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.image}
                      alt="Image"
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.buy_price}</TableCell>
                <TableCell>{item.rent_price}</TableCell>
                <TableCell>{item.genre}</TableCell>
                <TableCell>
                  <div>
                    <Link href={item.streamingLinks}>{item.streamingPlatform}</Link>
                    <p className="text-sm font-light">Click here to watch</p>  
                  </div>
                  
                  </TableCell>
               
                <TableCell>{item.status}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManagePicks;

