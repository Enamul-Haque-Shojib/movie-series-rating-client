/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import { TReviewPayload } from "@/types/item";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";



export const addReview = async (reviewData: TReviewPayload): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/add-review`, {
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

  export const reviewApproved = async (id: string) => {
      
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/admin-action/approve-review/${id}`, {
          method: "PATCH",
          body: JSON.stringify({approved:true}),
        
          headers: {
            Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
          "Content-Type": "application/json",
          },
          // cache: 'no-store',
        });
        revalidateTag("REVIEW");
        return res.json();
      } catch (error: any) {
        return Error(error);
      }
    };
  export const reviewPublished = async (id: string) => {
      
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/admin-action/publish-review/${id}`, {
          method: "PATCH",
          body: JSON.stringify({published:true}),
        
          headers: {
            Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
          "Content-Type": "application/json",
          },
          // cache: 'no-store',
        });
        revalidateTag("REVIEW");
        return res.json();
      } catch (error: any) {
        return Error(error);
      }
    };
  export const reviewUnPublished = async (id: string) => {
      
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/admin-action/unpublish-review/${id}`, {
          method: "PATCH",
          body: JSON.stringify({published:false}),
        
          headers: {
            Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
          "Content-Type": "application/json",
          },
          // cache: 'no-store',
        });
        revalidateTag("REVIEW");
        return res.json();
      } catch (error: any) {
        return Error(error);
      }
    };

    export const reviewDeletedByAdmin = async(id: string) => {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/admin-action/admin/delete-review/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            // cache: 'no-store'
            
        }
    );
    revalidateTag("REVIEW");
    const itemData = res.json();
    return itemData;
  }
    export const reviewDeletedByUser = async(id: string) => {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/user/delete-review/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            // cache: 'no-store'
            
        }
    );
    
    revalidateTag("REVIEW");
    const itemData = res.json();
    return itemData;
};



  export const getAllReviewByMediaId = async (id: string) => {
    

    try {
      const res = await fetch(
        `${process.env.NEXT_SERVER_URL}/api/user-action/user-review/${id}`,
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
        `${process.env.NEXT_SERVER_URL}/api/admin-action/get-review`,
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
  export const getAllReviewsByUserId = async (id: string) => {
  
    try {
      const res = await fetch(
        `${process.env.NEXT_SERVER_URL}/api/user-action/review-by-user/${id}`,
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
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/add-review-like`, {
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

  export const updateReview = async (reviewData: TReviewPayload, id: string): Promise<any> => {
      
      try {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/user/update-review/${id}`, {
          method: "PATCH",
          body: JSON.stringify(reviewData),
        
          headers: {
            Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
          "Content-Type": "application/json",
          },
          // cache: 'no-store',
        });
        revalidateTag("REVIEW");
        return res.json();
      } catch (error: any) {
        return Error(error);
      }
  };