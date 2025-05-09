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
  id?: string;
  userId: string;
  mediaId: string;
  transactionId: any;
  price: string;
  type: string;
}



export type TMedia={
    id?: string;
    title: string,
            image:string,
            director: string,
            description: string,
            synopsis: string,
            year: string,
            buy_price: string,
            rent_price: string,
            status: string,
            genre: string,
            streamingPlatform: string,
            streamingLinks: string,
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
            review:TReview;
            
}



export type TReview ={
  
             id: string;
              userId: IUser;
              mediaId: TMedia;
              content: string;
              rating: number;
              tags: string[];
              spoiler: boolean;
              approved : boolean;
              published: boolean;
              user: IUser;
              media: TMedia;
            reviewLike :{
               id: string;
              userId:string;
              reviewId:  string
            } [];
            reviewComment:TReviewComment;
}[];

export type TReviewComment={
  id: string;
  userId:string;
  reviewId:  string;
  userComment: string;
}[]
