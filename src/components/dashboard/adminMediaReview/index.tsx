

"use client";

import { useUser } from "@/context/UserContext";
import { getAllPurchases } from "@/services/TransactionService";
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
import { TReview } from "@/types/item";
import { getAllReviews } from "@/services/mediaReview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";


const ManageReview = () => {
  const { user } = useUser();
  const [reviews, setReviews] = useState<TReview[]>([]); // 🔹 Fix: Define Type

  useEffect(() => {
   

    const getAllReviewData = async () => {
      try {
        const res = await getAllReviews();
        console.log(res)
        setReviews(res?.data || []); // Ensure it doesn't set `undefined`
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviewData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All User Review</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <Table>
          <TableCaption>A list of all users reviews.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Media</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Spoiler</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Publish</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews?.map((rev) => (
              <TableRow key={rev.id}>
                <TableCell>
                  <div className="flex items-center justify-start gap-3">
                    
                      {rev?.media?.image && (
                        <Image
                          src={rev?.media?.image}
                          alt="Product Image"
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      )}
                   
                    <span className="font-medium text-gray-800">{rev?.media?.title}</span>
                  </div>
                </TableCell>

              
                <TableCell>
                  <div className="flex items-center justify-start gap-3">
                   
                      {rev?.user?.photoUrl && (
                        <Image
                          src={rev?.user?.photoUrl}
                          alt="user Image"
                          width={50}
                          height={50}
                          className="rounded-full object-cover"
                        />
                      )}
                  
                    <div>
                      <h2 className="font-semibold text-gray-700">{rev?.user?.name}</h2>
                   
                    </div>
                  </div>
                </TableCell>
                 <TableCell>
                 {rev?.content}
                </TableCell>
                 <TableCell>
                 {
                  rev?.tags?.map((tag,index)=><Badge key={index}>{tag}</Badge>)
                 }
                </TableCell>
                 <TableCell>
                 {
                  rev?.spoiler==true ? 'Yes' : "No"
                 }
                </TableCell>
                 <TableCell>
                 {
                  rev?.approved==true ? 'Approved' : "Pending"
                 }
                </TableCell>
                 <TableCell>
                 {
                  rev?.published==true ? 'Published' : "Unpublished"
                 }
                </TableCell>
                 <TableCell>
                <div className="flex">
                  {
                    rev.approved==false && <Button variant='outline'>Approved</Button>
                  }
                  {
                    rev.published==false ?  rev.approved==true ? <Button variant='outline'>Published</Button>:<></> : <Button variant='outline'>UnPublished</Button>
                  }
                  {
                    <Button variant='outline' className="text-red-600"><Trash></Trash></Button>
                  }
                  
                  
                  
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageReview;

