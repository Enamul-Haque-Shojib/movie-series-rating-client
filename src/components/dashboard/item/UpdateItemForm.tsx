/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useParams, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { toast } from 'sonner';
import { updateItem } from "@/services/itemService";

import createImage from "@/services/imageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { TInputMedia } from "@/types/item";


const UpdateItemForm = () => {
  const {user} = useUser();

    const router = useRouter();
    const params : {itemId: string} = useParams(); 

   
    
    // const { update_project } = useParams(); 
    const [imagePreview, setImagePreview] = useState<string>('');
 
    const [loading, setLoading] = useState<boolean>(true);

        const form = useForm({
            defaultValues: {
              title: '',
              image: null,
              director: '',
              description: '',
              synopsis: '',
              year:'',
              buy_price: '',
              rent_price: '',
              status: '',
               genre: '',
            streamingPlatform:''
            },
        });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(
                  // `${process.env.NEXT_SERVER_URL}/api/medias/one-media/${params?.itemId}`);
                  `https://movie-series-rating-server.vercel.app/api/medias/one-media/${params?.itemId}`);
                if (!res.ok) throw new Error("Failed to fetch item");
                const data = await res.json();
                const item = data.data;
             

                form.reset({
                    title: item.title,
                    image: item.image,
                    director: item.director,
                    description: item.description,
                    synopsis: item.synopsis,
                    year: item.year,
                    buy_price: item.buy_price,
                    rent_price: item.rent_price,
                    status: item.status,
                    genre: item.genre,
            streamingPlatform: item. streamingPlatform
                });

        
                setImagePreview(item.image);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [params?.itemId, form]);

  

    

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let image : string;
        image = imagePreview;
     

        if (typeof data.image === 'object') {
            image = await createImage(data.image[0]);
        }

    
     if (!user?.id){
             toast.error('Please sign up or login')
             return
           }; 
       const updatedItem: TInputMedia = {
  title: data.title,
  image,
  director: data.director,
  description: data.description,
  synopsis: data.synopsis,
  year: data.year,
  buy_price: data.buy_price,
  rent_price: data.rent_price,
  status: data.status,
  genre: data.genre,
  streamingPlatform: data.streamingPlatform,
};


       

        try {
            const res = await updateItem(updatedItem, params?.itemId);
            router.push('/dashboard/admin/listing')
              if(res.success==true){
                          toast.success(res.message);
                         }else{
                          toast.warning(res.message);
                         }
                         
        } catch (error:any) {
            console.error("Error submitting form:", error);
           toast.error(error.message);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading Item details...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-2xl text-black shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Update Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            
                                                       <FormField control={form.control} name="title" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Media Name</FormLabel>
                                                               <FormControl>
                                                                   <Input placeholder="Enter item name" required {...field} />
                                                               </FormControl>
                                                               <FormMessage />
                                                           </FormItem>
                                                       )} />
                           
                                                       <FormField control={form.control} name="image" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Media Image</FormLabel>
                                                               <FormControl>
                                                                   <Input 
                                                                   type="file" 
                                                                   accept="image/*" 
                                                                   onChange={(e) => {
                                                                       const file = e.target.files?.[0];
                                                                       field.onChange(e.target.files);
                                                                       if (file) {
                                                                           const imageUrl = URL.createObjectURL(file);
                                                                           setImagePreview(imageUrl);
                                                                       }
                                                                   }} />
                                                               </FormControl>
                                                               {imagePreview && <Image src={imagePreview} width={100} height={100} alt="Preview" className="rounded-lg mt-2" />}
                                                           </FormItem>
                                                       )} />
                           
                                                       <FormField control={form.control} name="description" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Description</FormLabel>
                                                               <FormControl>
                                                                   <Textarea placeholder="Item description" required {...field} />
                                                               </FormControl>
                                                               <FormMessage />
                                                           </FormItem>
                                                       )} />

                                                        <FormField control={form.control} name="synopsis" render={({ field }) => (
                                                                                       <FormItem>
                                                                                           <FormLabel>Synopsis</FormLabel>
                                                                                           <FormControl>
                                                                                               <Textarea placeholder="Item Synopsis" required {...field} />
                                                                                           </FormControl>
                                                                                           <FormMessage />
                                                                                       </FormItem>
                                                                                   )} />
                                                                                     <FormField control={form.control} name="director" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Director Name</FormLabel>
                                                               <FormControl>
                                                                   <Input placeholder="Enter director name" required {...field} />
                                                               </FormControl>
                                                               <FormMessage />
                                                           </FormItem>
                                                       )} />
                           
                           
                                                       <FormField control={form.control} name="year" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Year</FormLabel>
                                                               <FormControl>
                                                                   <Input placeholder="Enter Price" required {...field} />
                                                               </FormControl>
                                                               <FormMessage />
                                                           </FormItem>
                                                       )} />
                                                        <FormField control={form.control} name="buy_price" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Buy Price</FormLabel>
                                                               <FormControl>
                                                                   <Input placeholder="Enter Buy Price" required {...field} />
                                                               </FormControl>
                                                               <FormMessage />
                                                           </FormItem>
                                                       )} />
                                                        <FormField control={form.control} name="rent_price" render={({ field }) => (
                                                           <FormItem>
                                                               <FormLabel>Rent Price</FormLabel>
                                                               <FormControl>
                                                                   <Input placeholder="Enter Rent Price" required {...field} />
                                                               </FormControl>
                                                               <FormMessage />
                                                           </FormItem>
                                                       )} />
                           
                           <FormField
                                     control={form.control}
                                     name="status"
                                     rules={{ required: "Condition is required." }}
                                     render={({ field }) => (
                                       <FormItem>
                                         <FormLabel>Select Media Status</FormLabel>
                                         <FormControl>
                                           <Select
                                             onValueChange={field.onChange}
                                             value={field.value}
                                             required
                                           >
                                             <SelectTrigger className="w-full">
                                               <SelectValue placeholder="Select a condition" />
                                             </SelectTrigger>
                                             <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                                               <SelectGroup>
                                                 <SelectLabel>Media Status</SelectLabel>
                                                 {/* {deliverMen.map((man) => ( */}
                                                   {/* <SelectItem key={man._id} value={man.authId}>
                                                     {man.authId}
                                                   </SelectItem> */}
                                                 {/* ))} */}
                                                 <SelectItem value='MOVIE'>Movie</SelectItem>
                                                 <SelectItem value='SERIES'>Series</SelectItem>
                                               
                                               </SelectGroup>
                                             </SelectContent>
                                           </Select>
                                         </FormControl>
                                         <FormDescription>Choose the Media Status.</FormDescription>
                                         <FormMessage />
                                       </FormItem>
                                     )}
                                   />
                                          
                                   <FormField
                                             control={form.control}
                                             name="genre"
                                             rules={{ required: "Genre is required." }}
                                             render={({ field }) => (
                                               <FormItem>
                                                 <FormLabel>Select Media Genre</FormLabel>
                                                 <FormControl>
                                                   <Select
                                                     onValueChange={field.onChange}
                                                     value={field.value}
                                                     required
                                                   >
                                                     <SelectTrigger className="w-full">
                                                       <SelectValue placeholder="Choose a genre" />
                                                     </SelectTrigger>
                                                     <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                                                       <SelectGroup>
                                                         <SelectLabel>Media Genre</SelectLabel>
                                                        
                                                          <SelectItem value='Drama'> Drama</SelectItem>
                                                                               <SelectItem value='Comedy'>Comedy</SelectItem>
                                                                               <SelectItem value='Crime'>Crime</SelectItem>
                                                                               <SelectItem value='Superhero'>Superhero</SelectItem>
                                                                               <SelectItem value='Action'>Action</SelectItem>
                                                                               <SelectItem value='Horror'> Horror</SelectItem>
                                                                               <SelectItem value='Thriller'>Thriller </SelectItem>
                                                                               <SelectItem value='Sci-Fi'>Sci-Fi</SelectItem>
                                                                               <SelectItem value='Romance'>Romance</SelectItem>
                                                                               <SelectItem value='Fantasy'>Fantasy</SelectItem>
                                                                               <SelectItem value='Historical'> Historical</SelectItem>
                                                       
                                                       </SelectGroup>
                                                     </SelectContent>
                                                   </Select>
                                                 </FormControl>
                                                 <FormDescription>Choose the Media Genre.</FormDescription>
                                                 <FormMessage />
                                               </FormItem>
                                             )}
                                           />
                                   <FormField
                                             control={form.control}
                                             name="streamingPlatform"
                                             rules={{ required: "Streaming platform is required." }}
                                             render={({ field }) => (
                                               <FormItem>
                                                 <FormLabel>Select Streaming Platform</FormLabel>
                                                 <FormControl>
                                                   <Select
                                                     onValueChange={field.onChange}
                                                     value={field.value}
                                                     required
                                                   >
                                                     <SelectTrigger className="w-full">
                                                       <SelectValue placeholder="Choose a genre" />
                                                     </SelectTrigger>
                                                     <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                                                       <SelectGroup>
                                                         <SelectLabel>Streaming Platform</SelectLabel>
                                                        
                                                         <SelectItem value='netflix'> Netflix</SelectItem>
                                                                               <SelectItem value='amazon_prime_video'>Amazon Prime Video</SelectItem>
                                                                               <SelectItem value='disney+'>Disney+</SelectItem>
                                                                               <SelectItem value='hbo'>HBO</SelectItem>
                                                                               <SelectItem value='apple_tv'>Apple TV</SelectItem>
                                                                               <SelectItem value='peacock'>Peacock</SelectItem>
                                                                               <SelectItem value='paramount'>Paramount+</SelectItem>
                                                                               <SelectItem value='hulu'>Hulu</SelectItem>
                                                       
                                                       </SelectGroup>
                                                     </SelectContent>
                                                   </Select>
                                                 </FormControl>
                                                 <FormDescription>Choose the Streaming Platform.</FormDescription>
                                                 <FormMessage />
                                               </FormItem>
                                             )}
                                           />
                                   
                           

                            <Button type="submit" className="w-full bg-[#ff004f] hover:bg-red-700 transition">
                                Update item
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateItemForm;
