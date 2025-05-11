/* eslint-disable @typescript-eslint/no-explicit-any */


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
            rating: number;
            isEditorsPick:boolean;
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
            review:TReviewList;
            
}

export type TInputMedia = {
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
}

export type TPurchase = {
  id: string;
  media: TMedia;
  price: string;
  type: string;
  transactionId: string;
};




export type TReview ={
  
             id?: string;
              content: string;
              rating: number;
              tags: string[];
              spoiler: boolean;
              approved : boolean;
              published: boolean;
              isDeleted: boolean;
              mediaId: string;
              user: IUser;
              media: TMedia;
            reviewLike :{
               id: string;
              userId:string;
              reviewId:  string
            } [];
            reviewComment:TReviewComment;
};

export type TReviewList = TReview[];

export type TReviewPayload = {
  content: string;
  rating: number;
  tags: string[];
  spoiler: boolean;
  userId: string;
  mediaId: string;
};


export type TReviewComment={
  id: string;
  userId:string;
  reviewId:  string;
  userComment: string;
}
export type TReviewCommentList = TReviewComment[];


export type TWatchList = {
  id: string;
  userId: string;
  mediaId: string;
  user: IUser;
  media: TMedia
}
