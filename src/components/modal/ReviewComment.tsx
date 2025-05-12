/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
 
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Comments from './Comments';
import { getReviewCommentByReviewId } from '@/services/reviewComment';
import CommentForm from '../Form/CommentForm';
import { TReviewComment } from '@/types/item';

const ReviewComment = ({rev}:any) => {
      const [showSpoiler, setShowSpoiler] = useState(false);
       const [comments, setComments] = useState<TReviewComment[]>([]);

      
      
             useEffect(()=>{
             
                     const getReviewCommentData = async()=>{
                         const res = await getReviewCommentByReviewId(rev?.id);
                         
                         setComments(res?.data);
                     }
                    getReviewCommentData();
                    
                 },[rev?.id])
      
     return (
        <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
        
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Review Comment 
          </DialogDescription>
        </DialogHeader>
         
          <div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <Avatar>
                <AvatarImage src={rev?.user?.photoUrl} alt="User" />
              </Avatar>
              <div>
                <p className="font-semibold">{rev?.user?.name}</p>
                <p className="text-sm text-muted-foreground">Rated {rev?.rating}/10</p>
              </div>
            </div>
            <div className="text-xl text-muted-foreground"><i className="fa-solid fa-heart"></i>{rev?.reviewLike?.length}</div>
          </div>

          {rev.spoiler && !showSpoiler ? (
            <div className="text-center">
              <p className="italic text-muted-foreground">This review contains spoilers.</p>
              <Button size="sm" onClick={() => setShowSpoiler(true)}>
                Show Spoiler
              </Button>
            </div>
          ) : (
            <p className="text-base leading-relaxed">{rev.content}</p>
          )}
        </div>
       
      </div> 
     
      <ScrollArea className={comments.length!=0 ?`h-72 w-full rounded-md border`: `h-0 w-full rounded-md border` }>
         {
        comments.length==0 ? 
        <div><h1>No comments yet</h1></div> : 

        <div className="">
        {
        comments.map((comment) => (
          <Comments key={comment?.id}  comment = {comment} />
         ))
         }
      </div>
      }
        
       </ScrollArea>
      
   {/* <CommentForm reviewId = {rev?.id}></CommentForm> */}
   <CommentForm reviewId={rev?.id} onCommentAdded={(newComment) => setComments((prev) => [newComment, ...prev])} />

      
      </DialogContent>
    );
};

export default ReviewComment;