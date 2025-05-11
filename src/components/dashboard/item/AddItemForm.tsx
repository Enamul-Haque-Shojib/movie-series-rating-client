/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';


import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import createImage from '@/services/imageUpload';

import { addItem } from '@/services/itemService';
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

import { TInputMedia } from '@/types/item';

// import { CategoriesFilter } from '@/constant';


// import { useSession } from 'next-auth/react';

const AddItemForm = () => {
    // const {data: session} = useSession();
    //     const email = session?.user?.email || "";


    const [imagePreview, setImagePreview] = useState<string | null>(null);
   

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



 

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const imageFile = data.image?.[0];
        const image = await createImage(imageFile);

       const initialData: TInputMedia = {
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
            
           const res = await addItem(initialData);
           
            
             form.reset();
             if(res.success==true){
              toast.success(res.message);
             }else{
              toast.warning(res.message);
             }
             
           
        } catch (error:any) {
            
            console.error('Error submitting form:', error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-2xl text-black shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Add New Media</CardTitle>
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
                                        <Input placeholder="Enter Year" required {...field} />
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
          rules={{ required: "Status is required." }}
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
                    <SelectValue placeholder="choose a media status " />
                  </SelectTrigger>
                  <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                    <SelectGroup>
                      <SelectLabel>Media Status</SelectLabel>
                    
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
                      <SelectItem value='hbo_max'>HBO Max</SelectItem>
                      <SelectItem value='apple_tv'>Apple TV</SelectItem>
                      <SelectItem value='peacock'>Peacock</SelectItem>
                    
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
                                Add Media
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddItemForm;
