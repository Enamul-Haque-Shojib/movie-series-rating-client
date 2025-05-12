/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";

import { TInputMedia } from "@/types/item";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addItem = async (itemData: TInputMedia): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/medias/add`, {
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



export const updateItem = async (itemData: TInputMedia, id: string): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/medias/update/${id}`, {
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



    export const getAllItems = async (condition: string, search:string) => {
    
    let url='';
    if(condition==='search'){
      url=`${process.env.NEXT_SERVER_URL}/api/medias?searchTerm=${search}`
    }else if(condition === 'category'){
      url=`${process.env.NEXT_SERVER_URL}/api/medias?genre=${search}`
    }else{
      url=`${process.env.NEXT_SERVER_URL}/api/medias`
    }

    try {
      const res = await fetch(
        url,
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
        `${process.env.NEXT_SERVER_URL}/api/medias`,
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

 export const deleteItem = async(id: string) => {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/medias/delete-media/${id}`,
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
      `${process.env.NEXT_SERVER_URL}/api/medias/one-media/${mediaId}`,
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

export const getAllWatchlistByUserId = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/api/user-action/user-watchlist/${id}`,
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


export const addMediaLike = async (mediaLikeData:{userId: string, mediaId: string}): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/add-like`, {
        method: "POST",
        body: JSON.stringify(mediaLikeData),
      
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
export const addMediaUnLike = async (mediaUnLikeData:{userId: string, mediaId: string}): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/add-unlike`, {
        method: "POST",
        body: JSON.stringify(mediaUnLikeData),
      
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

export const addWatchlist = async (mediaWatchlistData:{userId: string, mediaId: string}): Promise<any> => {
    
    try {
      const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/user-action/add-watchlist`, {
        method: "POST",
        body: JSON.stringify(mediaWatchlistData),
      
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


  