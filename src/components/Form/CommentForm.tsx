import React from 'react';
import { Button } from "@/components/ui/button"

import { useUser } from '@/context/UserContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea"
import { addReviewComment } from '@/services/reviewComment';


const CommentForm = ({reviewId}:any) => {
  
       const { user } = useUser();

    const form = useForm({
      defaultValues: {
        userComment: '',
      
      },
    });

  


 
    const onSubmit:SubmitHandler<FieldValues> = async (data) => {

  
      try {
        data.userId= user?.id;
        data.reviewId = reviewId;
       

        
console.log(data)
  
        const res = await addReviewComment(data)
        console.log(res)
        form.reset();
      
        if(res.success==true){
            toast.success('Comment added successfully')
        }else{
            toast.warning('Comment could not be added')
        }
        
       
      } catch (error) {
        console.error('Error review:', error);
        toast.error('')
      }
    };
    return (
        
         
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            
            <FormField
              control={form.control}
              name="userComment"
              rules={{ required: 'Comment is required.' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comment about the review"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Share your experience.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

     
          
          

            {/* Submit Button */}
            <div className="col-span-full text-center">
              <Button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
 
    );
};

export default CommentForm;