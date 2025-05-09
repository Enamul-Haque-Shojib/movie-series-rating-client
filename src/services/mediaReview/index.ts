
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
      revalidateTag("MEDIA");
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