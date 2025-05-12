/* eslint-disable @typescript-eslint/no-unused-vars */



"use client"


import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PayModal from "../../modal/PayModal";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';


import { useUser } from '@/context/UserContext';

import { toast } from 'sonner';
import { TMedia } from '@/types/item';  // Import the correct type for product
import { Clock, MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MediaReview from "./MediaReview";
import ReviewForm from "@/components/modal/ReviewForm";
import { addMediaLike, addMediaUnLike, addWatchlist } from "@/services/itemService";

interface ManageMediaDetailsProps {
  media: TMedia;  // Explicitly type the product prop
}
const ManageMediaDetails: React.FC<ManageMediaDetailsProps> = ({ media }) => {
    const { user, isLoading, setIsLoading } = useUser();
 
  

    
    const { id, title, description, synopsis, director, image, status, buy_price, rent_price, year, like, unlike, genre, streamingPlatform} = media;
    // const [statusItem, setStatusItem] = useState(status)
    useEffect(() => {
      if(media) setIsLoading(false);

    },[media, setIsLoading])
 


  const handleMediaLike = async(id:string)=>{
    if (!user?.id) {
    toast.error("Please Sign up or login");
    return;
  }
              try {
                const res = await addMediaLike({userId:user?.id, mediaId: id})
             
             if(res?.success==true){
              toast.success('Media Like successfully added')
             }else{
              toast.warning('You have already like this Media')
             }
              } catch (error) {
                toast.error('Something went wrong!')
              }
             
      }
  const handleMediaUnLike = async(id:string)=>{
      if (!user?.id) {
    toast.error("Please Sign up or login");
    return;
  }
              try {
                const res = await addMediaUnLike({userId:user?.id, mediaId: id})
             
             if(res?.success==true){
              toast.success('Media UnLike successfully added')
             }else{
              toast.warning('You have already Unlike this Media')
             }
              } catch (error) {
                toast.error('Something went wrong!')
              }
             
      }
  const handleWatchlist = async(id:string)=>{
      if (!user?.id) {
    toast.error("User ID is missing");
    return;
  }
              try {
                const res = await addWatchlist({userId:user?.id, mediaId: id})
             
             if(res?.success==true){
              toast.success('Media successfully added in watchlist')
             }else{
              toast.warning('You have already added in watchlist')
             }
              } catch (error) {
                toast.error('Something went wrong!')
              }
             
      }

    if(isLoading){
    return <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
  }

  return (
    <div>


       <div className="container mx-auto px-4 my-12">
       <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden rounded-lg">
         <div className="lg:w-1/2 p-5 flex flex-col items-center">
           <AspectRatio ratio={16 / 9} className="bg-muted border rounded-lg overflow-hidden">
             <Image
              src={image}
              alt={title}
              fill
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </AspectRatio>
        <div className='w-full flex justify-start items-center'>
          <div className='flex justify-center items-center'>
            <Button variant="outline" className="cursor-pointer"
            onClick={()=>handleMediaLike(id as string)}
            ><ThumbsUp></ThumbsUp></Button><span>{like.length}</span>
            </div>
          <div className='flex justify-center items-center'>
            <Button variant="outline" className="cursor-pointer"
            onClick={()=>handleMediaUnLike(id as string)}
            ><ThumbsDown></ThumbsDown></Button><span>{unlike.length}</span>
            </div>
            <div>
              <Dialog>
                  <DialogTrigger asChild>
                  {
                    user && <Button className="cursor-pointer" variant="outline"><MessageSquare></MessageSquare>Add Review +</Button>
                  }
                  </DialogTrigger>
                  <ReviewForm mediaId={{ id}}></ReviewForm>
                  
                </Dialog>
            </div>
            <div className='flex justify-center items-center'>
              {
                user && <Button variant="outline" className="cursor-pointer"
            onClick={()=>handleWatchlist(id as string)}
            ><Clock></Clock>Add WatchList +</Button>
              }
            
            </div>
        </div>
        </div>
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{title}</CardTitle>
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">{description}</CardDescription>
          </CardHeader>
          <CardContent className="text-gray-800 dark:text-gray-300 space-y-2">
         <h1 className="text-muted-foreground">Synopsis: {synopsis}</h1>
            <p className="text-muted-foreground">
            {year} • Directed by {director}
          </p>
            <p><span className="font-semibold">Platform: </span> {streamingPlatform}</p>
            <p><span className="font-semibold">Genre: </span> {genre}</p>
            <p><span className="font-semibold">Buy Price: </span> ${buy_price}</p>
            <p><span className="font-semibold">Rent Price: </span> ${rent_price}</p>
            <p className="font-semibold">Status:{status}</p>
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
              <Dialog>
                  <DialogTrigger asChild>
                  {
                    user && <Button variant="outline">Buy / Rent</Button>
                  }
                    
                   
                  </DialogTrigger>
                  <PayModal mediaData={{ id, title,image, buy_price, rent_price }}></PayModal>
                  
                </Dialog>
          </CardFooter>
        </div>
      </Card>
    </div>






       <div className="max-w-4xl mx-auto p-6 space-y-6">
  
      <Separator />

      <MediaReview id = {id as string}></MediaReview>

      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="text-muted-foreground">No comments yet. Be the first to comment.</div>
      </div>
    </div>
    </div>
   
  );
} 

export default ManageMediaDetails;

