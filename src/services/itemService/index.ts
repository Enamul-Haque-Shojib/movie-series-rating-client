/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";

import { TMedia } from "@/types/item";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addItem = async (itemData: TMedia): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:3001/api/medias/add`, {
        method: "POST",
        body: JSON.stringify(itemData),
      
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



export const updateItem = async (itemData: TMedia, id: string): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:3001/api/medias/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify(itemData),
      
        headers: {
          Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store',
      });
      revalidateTag("MEDIA");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };

  export const getAllItems = async () => {
    

    try {
      const res = await fetch(
        'http://localhost:3001/api/medias',
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

  
  export const getUserItems = async () => {
    
  

    try {
      const res = await fetch(
        `http://localhost:3001/api/medias`,
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

  const deleteItem = async(id: string) => {
    const res = await fetch(`https://second-hand-marketplace-server.vercel.app/api/listings/delete-listing/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            // cache: 'no-store'
            
        }
    );
    
    revalidateTag("MEDIA");
    const itemData = res.json();
    return itemData;
};


export const getSingleMedia = async (mediaId: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/api/medias/one-media/${mediaId}`,
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

export default deleteItem;
  