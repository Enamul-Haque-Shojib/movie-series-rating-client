/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TReviewComment } from "@/types/item";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addReviewComment = async (commentData: TReviewComment): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/add-review-comment`, {
        method: "POST",
        body: JSON.stringify(commentData),
      
        headers: {
          Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("MEDIA");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };

  export const getReviewCommentByReviewId = async (id: string) => {
    

    try {
      const res = await fetch(
        `${process.env.NEXT_SERVER_URL}/api/user-action/get-review-comment/${id}`,
        {
          next: {
            tags: ["MEDIA"],
          },
        }
      );
      const data = await res.json();
   
      
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };