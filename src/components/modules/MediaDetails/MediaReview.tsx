/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ReviewComment from '@/components/modal/ReviewComment';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@/context/UserContext';
import { addReviewLike, getAllReviewByMediaId } from '@/services/mediaReview';
import { TReview } from '@/types/item';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


interface MediaReviewProps {
  id:string;  // Explicitly type the product prop
}
const MediaReview: React.FC<MediaReviewProps>  = ({id}:any) => {

    const {user} = useUser();
       const [showSpoiler, setShowSpoiler] = useState(false);

       const [reviews, setReviews] = useState<TReview[]>([]);
      


       useEffect(()=>{
       
               const getReviewData = async()=>{
                   const res = await getAllReviewByMediaId(id);
                   
                   setReviews(res?.data);
               }
              getReviewData();
              
           },[id])


        
  const handleReviewLike = async (reviewId: string) => {
  if (!user?.id) {
    toast.error("Please sign up or login");
    return;
  }

  try {
    const res = await addReviewLike({ userId: user.id, reviewId });

    if (res?.success === true) {
      toast.success("Review Like successfully added");

      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? {
                ...review,
                reviewLike: [
                  ...review.reviewLike,
                  {
                    id: Date.now().toString(), // fake ID for frontend update
                    userId: user.id,
                    reviewId: reviewId,
                  },
                ],
              }
            : review
        )
      );
    } else {
      toast.warning("You have already liked this review");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};




    return (
        <div>

              {
                reviews?.map(rev=>(
                <Card key={rev?.id}>
        <CardContent className="p-4 space-y-3">
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
              {
                <Button size="sm" onClick={() => setShowSpoiler(true)}>
                Show Spoiler
              </Button>
              }
              
            </div>
          ) : (
            <p className="text-base leading-relaxed">{rev.content}</p>
          )}
        </CardContent>
        <div className='flex justify-center items-center space-x-2 text-xl'>
          {
             (user && user.role=='USER') &&   <Button variant="outline" className='cursor-pointer'><i className="fa-solid fa-heart"
            onClick={()=>handleReviewLike(rev.id as string)}
            ></i></Button>
          }
          
            <Dialog>
                  <DialogTrigger asChild>
                  {
                   (user && user.role=='USER') && <Button variant="outline" 
                    className='cursor-pointer' 
                    ><i className="fa-solid fa-comment"></i></Button>
                  }
                    
                   
                  </DialogTrigger>
                  <ReviewComment rev={rev}></ReviewComment>
                  
                </Dialog>
            
        </div>
      </Card> ))
            } 
             
            
        </div>
    );
};

export default MediaReview;