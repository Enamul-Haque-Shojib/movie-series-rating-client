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
import { getAllPurchasesByUserId } from "@/services/TransactionService";

const ManageUsersItems = () => {
  const { user } = useUser();
  const router = useRouter();
  const [items, setItems] = useState<TMedia[]>([]);
console.log(items)
  useEffect(() => {
    const fetchAllPurchases = async () => {
      const res = await getAllPurchasesByUserId(user?.id);
      setItems(res?.data);
    };
    fetchAllPurchases();
  }, [user?.id]);



  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Purchase Movies and Series</h1>
      
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>A list of your Purchase items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
       
              <TableHead>Price</TableHead>
          
       
       
              <TableHead>Platform</TableHead>
             
              <TableHead>Genre</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Transaction Id</TableHead>
         
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
     
                <TableCell>{item.price}</TableCell>
              
              
                <TableCell>
                  <div>
                    <Link href={item?.media?.streamingLinks}>{item?.media?.streamingPlatform}</Link>
                    <p className="text-sm font-light">Click here to watch</p>  
                  </div>
                  
                  </TableCell>
               
                <TableCell>{item?.media?.genre}</TableCell>
                <TableCell>{item?.media?.status}</TableCell>
                <TableCell>{item?.type}</TableCell>
                <TableCell>{item.transactionId}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUsersItems;

