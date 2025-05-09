import ReviewComment from '@/components/modal/ReviewComment';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { getAllReviewByMediaId } from '@/services/mediaReview';
import { TReview } from '@/types/item';
import React, { useEffect, useState } from 'react';


interface MediaReviewProps {
  id:string;  // Explicitly type the product prop
}
const MediaReview: React.FC<MediaReviewProps>  = ({id}) => {

    
       const [showSpoiler, setShowSpoiler] = useState(false);

       const [reviews, setReviews] = useState([])


       useEffect(()=>{
       
               const getReviewData = async()=>{
                   const res = await getAllReviewByMediaId(id);
                   
                   setReviews(res?.data);
               }
              getReviewData();
              
           },[id])
        // const { id, userId, mediaId, reviewComent, reviewLike, rating, spoiler, content } = review;
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
              <Button size="sm" onClick={() => setShowSpoiler(true)}>
                Show Spoiler
              </Button>
            </div>
          ) : (
            <p className="text-base leading-relaxed">{rev.content}</p>
          )}
        </CardContent>
        <div className='flex justify-center items-center space-x-2 text-xl'>
            <i className="fa-solid fa-heart"></i>
            <Dialog>
                  <DialogTrigger asChild>
                  {
                    <Button variant="outline"><i className="fa-solid fa-comment"></i></Button>
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