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
import { TMedia } from "@/types/item";


const UpdateItemForm = () => {
  const {user} = useUser();
  console.log('---->>>>',user)
    const router = useRouter();
    const params : {itemId: string} = useParams(); 

   
    
    // const { update_project } = useParams(); 
    const [imagePreview, setImagePreview] = useState<string>('');
 
    const [loading, setLoading] = useState<boolean>(true);

        const form = useForm({
            defaultValues: {
              title: '',
              image: null,
              description: '',
              year:'',
              buy_price: '',
              rent_price: '',
              status: '',
            },
        });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/medias/one-media/${params?.itemId}`);
                if (!res.ok) throw new Error("Failed to fetch item");
                const data = await res.json();
                const item = data.data;
             

                form.reset({
                    title: item.title,
                    image: item.image,
                    description: item.description,
                    year: item.year,
                    buy_price: item.buy_price,
                    rent_price: item.rent_price,
                    status: item.status,
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

    
     if (!user?.id) return;
        const updatedItem : TMedia = {
          title: data.title,
          image,
          description: data.description,
          year: data.year,
          buy_price: data.buy_price,
          rent_price: data.rent_price,
          status: data.status
        };

       

        try {
            const res = await updateItem(updatedItem, params?.itemId);
            router.push('/dashboard/admin/listing')
            toast.success(res.message);
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
