/* eslint-disable @typescript-eslint/no-unused-vars */


"use client";

import { useUser } from "@/context/UserContext";

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
import { getAllReviewsByUserId, reviewDeletedByUser } from "@/services/mediaReview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateReviewForm from "@/components/modal/UpdateReviewForm";
import { toast } from "sonner";


const ManageUserReview = () => {
  const { user } = useUser();
  const [reviews, setReviews] = useState<TReview[]>([]); // 🔹 Fix: Define Type

  useEffect(() => {
   

    const getAllReviewData = async () => {
      try {
        if (!user?.id){
          toast.error('Please Sign up or login')
          return
        }; 
        const res = await getAllReviewsByUserId(user?.id);
 
        setReviews(res?.data || []); // Ensure it doesn't set `undefined`
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviewData();
  }, [user?.id]);

    const handleDelete =async(id:string)=>{
    try {
      const res = await reviewDeletedByUser(id);
   
      if(res.success==true){
         setReviews((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success('Review deleted successfully')
      }else{
        toast.warning('Review could not be deleted')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

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
        
              <TableHead>Content</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Spoiler</TableHead>
              <TableHead>Rating</TableHead>
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
                <TableCell>{rev.rating}</TableCell>
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
                    rev?.published==false ? <>
                    <Dialog>
                  <DialogTrigger asChild>
                  
                     <Button variant='outline'><Edit></Edit></Button>
                  
                  </DialogTrigger>
                  <UpdateReviewForm mediaId={rev?.mediaId} reviewId={rev.id}></UpdateReviewForm>
                  
                </Dialog>

                    <Button variant='outline' className="text-red-600" onClick={()=>handleDelete(rev?.id as string)}><Trash></Trash></Button>
                  
                  
                    </> :
                    <p className="bg-orange-600 text-white flex justify-center items-center p-2 rounded-2xl">Published the review</p>
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

export default ManageUserReview;

