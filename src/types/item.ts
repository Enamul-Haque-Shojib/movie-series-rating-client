/* eslint-disable @typescript-eslint/no-explicit-any */

// export interface IUser {
    
//     name: string;
//     email: string;
//     hasShop?: boolean;
//     status?: "Ban" | "Unban";
//     role: "user" | "admin";
//     iat?: number;
//     exp?: number;
//   }
export interface IUser {
    id: string;
    name: string;
    photoUrl: string;
    email: string;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
    role: "USER" | "ADMIN";
    
  }
  
export interface ITransaction {
  _id?: string;
  buyerId: any;
  sellerId: any;
  itemId: any;
  status?: string;
}



export type TMedia={
    id?: string;
    title: string,
            image:string,
            description: string,
            year: string,
            buy_price: string,
            rent_price: string,
            status: string,
            like: {
              id: string;
              userId: string;
              mediaId: string;
            }[];
            unlike: {
              id: string;
              userId: string;
              mediaId: string;
            }[];
            comment: {
              id: string;
              userId: string;
              mediaId: string;
              userComment: string;
            }[];
            
}