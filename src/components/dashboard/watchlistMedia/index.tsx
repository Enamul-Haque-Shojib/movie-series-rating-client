



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




import { TWatchList } from "@/types/item";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { getAllWatchlistByUserId } from "@/services/itemService";

const ManageWatchList = () => {
  const { user } = useUser();
  console.log(user?.id)

  const [items, setItems] = useState<TWatchList[]>([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      if (!user?.id) return; 
      const res = await getAllWatchlistByUserId(user?.id);
      console.log(res)
      setItems(res?.data);
    };
    fetchAllItems();
  }, [user?.id]);



  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Movies and Series WatchList</h1>
        
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>A list of your items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
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
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item?.media?.image}
                      alt="Image"
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </TableCell>
                <TableCell>{item?.media?.title}</TableCell>
                <TableCell>{item?.media?.year}</TableCell>
                <TableCell>{item?.media?.buy_price}</TableCell>
                <TableCell>{item?.media?.rent_price}</TableCell>
                <TableCell>{item?.media?.genre}</TableCell>
                <TableCell>
                  <div>
                    <Link href={item?.media?.streamingLinks}>{item?.media?.streamingPlatform}</Link>
                    <p className="text-sm font-light">Click here to watch</p>  
                  </div>
                  
                  </TableCell>
               
                <TableCell>{item?.media?.status}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> 
    </div>
  );
};

export default ManageWatchList;

