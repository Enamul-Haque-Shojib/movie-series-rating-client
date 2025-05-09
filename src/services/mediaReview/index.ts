
"use server";
import { TReview } from "@/types/item";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";



export const addReview = async (reviewData: TReview): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:3001/api/user-action/add-review`, {
        method: "POST",
        body: JSON.stringify(reviewData),
      
        headers: {
          Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("REVIEW");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };



  export const getAllReviewByMediaId = async (id: string) => {
    

    try {
      const res = await fetch(
        `http://localhost:3001/api/user-action/user-review/${id}`,
        {
          next: {
            tags: ["REVIEW"],
          },
        }
      );
      const data = await res.json();
   
      
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };
  export const getAllReviews = async () => {
    

    try {
      const res = await fetch(
        `http://localhost:3001/api/admin-action/get-review`,
        {
          next: {
            tags: ["REVIEW"],
          },
        }
      );
      const data = await res.json();
   
      
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };


  export const addReviewLike = async (reviewLikeData:{userId: string, reviewId: string}): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:3001/api/user-action/add-review-like`, {
        method: "POST",
        body: JSON.stringify(reviewLikeData),
      
        headers: {
          Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("REVIEW");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };