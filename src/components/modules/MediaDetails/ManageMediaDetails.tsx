


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import React, { useEffect} from 'react';
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import Image from 'next/image';


// import { useUser } from '@/context/UserContext';
// import { addTransaction } from '@/services/TransactionService';
// import { toast } from 'sonner';
// import { TMedia } from '@/types/item';  // Import the correct type for product
// import { ThumbsDown, ThumbsUp } from 'lucide-react';

// interface ManageMediaDetailsProps {
//   media: TMedia;  // Explicitly type the product prop
// }

// const ManageMediaDetails: React.FC<ManageMediaDetailsProps> = ({ media }) => {
//   const { user, isLoading, setIsLoading } = useUser();

//   console.log(media)
  
//   const { id, title, description, image, status, buy_price, rent_price, year, like, unlike } = media;
//   // const [statusItem, setStatusItem] = useState(status)
//   useEffect(() => {
//     if(media) setIsLoading(false);
//   },[media, setIsLoading])

//   // const handleTransaction = async () => {
//   //   try {
//   //     const transactionData = {
//   //       buyerId: user?._id,
//   //       sellerId: userId?._id,
//   //       itemId: _id,
//   //     };
      
//   //     const res = await addTransaction(transactionData);
//   //     if(res.success){
//   //       toast.success(res.message);
//   //     }else{
//   //       toast.warning(res.message);
//   //     }
      
//   //   } catch (error:any) {
//   //     toast.error(error.message);
//   //   }
//   // };

//   if(isLoading){
//     return <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
//   }
  
//   return (
//     <div className="container mx-auto px-4 my-12">
//       <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden rounded-lg">
//         <div className="lg:w-1/2 p-5 flex flex-col items-center">
//           <AspectRatio ratio={16 / 9} className="bg-muted border rounded-lg overflow-hidden">
//             <Image
//               src={image}
//               alt={title}
//               fill
//               className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//             />
//           </AspectRatio>
//         <div className='w-full flex justify-start items-center'>
//           <div className='flex'><ThumbsUp></ThumbsUp><span>{like.length}</span></div>
//           <div className='flex'><ThumbsDown></ThumbsDown><span>{unlike.length}</span></div>
//         </div>
//         </div>
//         <div className="p-6 lg:w-1/2 flex flex-col justify-between">
//           <CardHeader>
//             <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">{title}</CardTitle>
//             <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">{description}</CardDescription>
//           </CardHeader>
//           <CardContent className="text-gray-800 dark:text-gray-300 space-y-2">
        
//             <p><span className="font-semibold">Year: </span> {year}</p>
//             <p><span className="font-semibold">Buy Price: </span> ${buy_price}</p>
//             <p><span className="font-semibold">Rent Price: </span> ${rent_price}</p>
//             <p className="font-semibold">Status:{status}</p>
//           </CardContent>
//           <CardFooter className="flex justify-center mt-4">
//             {/* {user && user?._id !== userId?._id && ( */}
//               <Button disabled={status==='Sold'} variant="default" size="lg" 
//               // onClick={handleTransaction} 
//               className="px-6 py-2 text-lg">
//                 Buy Now
//               </Button>
//             {/* )} */}
//           </CardFooter>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ManageMediaDetails;


"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { TMedia } from "@/types/item";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PayModal from "../../modal/PayModal";

interface ManageMediaDetailsProps {
  media: TMedia;  // Explicitly type the product prop
}
const ManageMediaDetails: React.FC<ManageMediaDetailsProps> = ({ media }) => {
    const { user, isLoading, setIsLoading } = useUser();
    const [showSpoiler, setShowSpoiler] = useState(false);
  
    console.log(media)
    
    const { id, title, description, synopsis, director, image, status, buy_price, rent_price, year, like, unlike, genre, streamingPlatform, streamingLinks } = media;
    // const [statusItem, setStatusItem] = useState(status)
    useEffect(() => {
      if(media) setIsLoading(false);
    },[media, setIsLoading])
 

  const metadata = {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    posterUrl: "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    rating: 9,
    review: "A mind-bending thriller that explores the nature of reality.",
    spoiler: true,
    tags: ["classic", "mind-blowing"],
    likes: 134,
  };

    if(isLoading){
    return <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* <img
          src={metadata.posterUrl}
          alt="Poster"
        
          className="w-full md:w-64 rounded-xl shadow-md"
        /> */}
          <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src={image}
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio> 
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <h1 className="text-muted-foreground">Description: {description}</h1>
          <h1 className="text-muted-foreground">Synopsis: {synopsis}</h1>
          <p className="text-muted-foreground">
            {year} • Directed by {director}
          </p>
          {/* <p className="text-muted-foreground">
            Cast: {metadata.cast.join(", ")}
          </p> */}
          {/* <div className="flex gap-2">
            {metadata.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div> */}
          <p className="text-muted-foreground">Buy price: {buy_price}</p>
          <p className="text-muted-foreground">Rent price: {rent_price}</p>
          
          <Dialog>
                  <DialogTrigger asChild>
                  {
                    <Button variant="outline">Buy / Rent</Button>
                  }
                    
                   
                  </DialogTrigger>
                  <PayModal mediaData={{ id, title,image, buy_price, rent_price }}></PayModal>
                  
                </Dialog>
        </div>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <Avatar>
                <AvatarImage src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="User" />
              </Avatar>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">Rated {metadata.rating}/10</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{metadata.likes} likes</div>
          </div>

          {metadata.spoiler && !showSpoiler ? (
            <div className="text-center">
              <p className="italic text-muted-foreground">This review contains spoilers.</p>
              <Button size="sm" onClick={() => setShowSpoiler(true)}>
                Show Spoiler
              </Button>
            </div>
          ) : (
            <p className="text-base leading-relaxed">{metadata.review}</p>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="text-muted-foreground">No comments yet. Be the first to comment.</div>
      </div>
    </div>
  );
} 

export default ManageMediaDetails;

