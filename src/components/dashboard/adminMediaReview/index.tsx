/* eslint-disable @typescript-eslint/no-unused-vars */


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
import { TReview } from "@/types/item";
import { getAllReviews, reviewApproved, reviewDeletedByAdmin, reviewPublished, reviewUnPublished } from "@/services/mediaReview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";


const ManageReview = () => {
 
  const [reviews, setReviews] = useState<TReview[]>([]); 


  // how can i use 'useState' for 'approved' and 'published' for real changing ?

  useEffect(() => {
   

    const getAllReviewData = async () => {
      try {
        const res = await getAllReviews();
    
        setReviews(res?.data || []); // Ensure it doesn't set `undefined`
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviewData();
  }, []);

  // const handleApproved =async(id:string)=>{
  //   try {
  //     const res = await reviewApproved(id);
  //     console.log(res)
  //     if(res.success==true){
  //       toast.success('Review approved successfully')
  //     }else{
  //       toast.warning('Review could not be approved')
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong!')
  //   }
  // }

  const handleApproved = async (id: string) => {
  try {
    const res = await reviewApproved(id);
    if (res.success === true) {
      setReviews(prev =>
        prev.map(review =>
          review.id === id ? { ...review, approved: true } : review
        )
      );
      toast.success("Review approved successfully");
    } else {
      toast.warning("Review could not be approved");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};
  // const handlePublished =async(id:string)=>{
  //   try {
  //     const res = await reviewPublished(id);
      
  //     if(res.success==true){
  //       toast.success('Review published successfully')
  //     }else{
  //       toast.warning('Review could not be published')
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong!')
  //   }
  // }

  const handlePublished = async (id: string) => {
  try {
    const res = await reviewPublished(id);
    if (res.success === true) {
      setReviews(prev =>
        prev.map(review =>
          review.id === id ? { ...review, published: true } : review
        )
      );
      toast.success("Review published successfully");
    } else {
      toast.warning("Review could not be published");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

  // const handleUnpublished =async(id:string)=>{
  //   try {
  //     const res = await reviewUnPublished(id);
     
  //     if(res.success==true){
  //       toast.success('Review unpublished successfully')
  //     }else{
  //       toast.warning('Review could not be unpublished')
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong!')
  //   }
  // }

  const handleUnpublished = async (id: string) => {
  try {
    const res = await reviewUnPublished(id);
    if (res.success === true) {
      setReviews(prev =>
        prev.map(review =>
          review.id === id ? { ...review, published: false } : review
        )
      );
      toast.success("Review unpublished successfully");
    } else {
      toast.warning("Review could not be unpublished");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

  const handleDeleted =async(id:string)=>{
    try {
      const res = await reviewDeletedByAdmin(id);
 
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
              <TableHead>User</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Spoiler</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Publish</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Delete</TableHead>
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
                    rev.isDeleted==false?<>
                    
                    {
                    rev.approved==false && 
                    <Button variant='outline' onClick={()=>handleApproved(rev?.id as string)}>Approved</Button>
                  }
                  {
                    rev.published==false ?  (rev.approved==true ? 
                    <Button variant='outline' onClick={()=>handlePublished(rev?.id as string)}>Published</Button>:<></>) 
                    :
                     <Button variant='outline' onClick={()=>handleUnpublished(rev?.id as string)}>UnPublished</Button>
                  }
                    </> : <p className="bg-red-600 text-white flex justify-center items-center p-2 rounded-2xl">User deleted the review</p>
                  }
                  
                  
                  
                </div>
                </TableCell>
                <TableCell>
                  {
                    <Button 
                    variant='outline' 
                    className="text-red-600"
                    onClick={()=>handleDeleted(rev?.id as string)}
                    ><Trash></Trash></Button>
                  }
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

