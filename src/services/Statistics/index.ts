/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getTopRatedMedia = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_SERVER_URL}/api/statistics/top-rated-week`,
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


export const getNewlyAddedMedia = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_SERVER_URL}/api/statistics/newly-added`,
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


export const getEditorPickedMedia = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_SERVER_URL}/api/statistics/editor-picked`,
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

    export const addEditorPickedByAdmin = async (id: string) => {
        
        try {
          const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/statistics/add-editor-picked/${id}`, {
            method: "PATCH",
            body: JSON.stringify({isEditorsPick:true}),
          
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
    export const removeEditorPickedByAdmin = async (id: string) => {
        
        try {
          const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/statistics/remove-editor-picked/${id}`, {
            method: "PATCH",
            body: JSON.stringify({isEditorsPick:false}),
          
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