/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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

import deleteItem, { getUserItems } from "@/services/itemService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { TMedia } from "@/types/item";
import Link from "next/link";

const ManageWatchList = () => {
  const { user } = useUser();
  const router = useRouter();
  const [items, setItems] = useState<TMedia[]>([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      const res = await getAllWatchListByUserId();
      setItems(res?.data);
    };
    fetchAllItems();
  }, []);



  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Movies and Series WatchList</h1>
        <Button
          onClick={() => router.push("/dashboard/admin/listing/add-item")}
          size="sm"
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Media</span>
        </Button>
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

export default ManageWatchList;

