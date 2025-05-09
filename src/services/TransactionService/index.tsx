
"use server"
import { ITransaction } from "@/types/item";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const addTransaction = async (transactionData: ITransaction): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:3001/api/purchases/add-purchase`, 

        {
        method: "POST",
        body: JSON.stringify(transactionData),
      
        headers: {
          Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("TRANSACTION");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };
export const createPayment = async (payload:{id: string}): Promise<any> => {
    
    try {
      const res = await fetch(`http://localhost:3001/api/purchases/create-payment`, 

        {
        method: "POST",
        body: JSON.stringify(payload),
      
        headers: {
          Authorization: (await cookies()).get("movieSeriesRating_accessToken")!.value,
        "Content-Type": "application/json",
        },
        // cache: 'no-store'
      });
      revalidateTag("TRANSACTION");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };



  export const getAllPurchases = async () => {

    try {
      const res = await fetch(
        `http://localhost:3001/api/purchases/all-purchase`,
        {
          next: {
            tags: ["TRANSACTION"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };
  export const getAllPurchasesByUserId = async (userId: string) => {

    try {
      const res = await fetch(
        `http://localhost:3001/api/purchases/purchase-by-userid/${userId}`,
        {
          next: {
            tags: ["TRANSACTION"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

  export const getAllSales = async (userId: string) => {

    try {
      const res = await fetch(
        `https://second-hand-marketplace-server.vercel.app/api/transactions/sales/${userId}`,
        {
          next: {
            tags: ["TRANSACTION"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

