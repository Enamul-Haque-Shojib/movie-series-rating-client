

"use client";


import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem,FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useUser } from '@/context/UserContext';
import Media from './Media';

const AllMedias = () => {   
  const { medias} = useUser();

  console.log(medias)

  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     const res = await getAllItems('search', data.search);
  //     form.reset();
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  return (
    <div className='container mx-auto px-4 my-12'>
      <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-8'>All Products</h1>
      <div className='bg-white dark:bg-gray-900 rounded-lg'>
        <Form {...form}>
          <form 
          // onSubmit={form.handleSubmit(onSubmit)}
           className='flex flex-col sm:flex-row items-center justify-around gap-4 mb-10'>
            <FormField
              control={form.control}
              name='search'
              render={({ field }) => (
                <FormItem className='w-full sm:w-auto flex-1'>
                  
                  <FormControl>
                    <Input type='text' placeholder='Search products...' required {...field} className='rounded-lg border-gray-300 dark:border-gray-700' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full sm:w-auto bg-primary hover:bg-primary/90 transition rounded-lg px-6 py-2 text-white font-semibold'>
              Search
            </Button>
          </form>
        </Form>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {medias.length > 0 ? (
          medias.map((media) => <Media key={media.id} media={media} />)
        ) : (
          <p className='text-center text-gray-500 dark:text-gray-400 col-span-full'>No Medias found</p>
        )}
      </div>
    </div>
  );
};

export default AllMedias;

