/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {

  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { useUser } from '@/context/UserContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Star, X } from 'lucide-react';
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input';
import { addReview } from '@/services/mediaReview';
import { TReviewPayload } from '@/types/item';
import { useRouter } from 'next/navigation';

const ReviewForm = ({mediaId}:any) => {
  const router = useRouter();
       const { user } = useUser();
    const [tags, setTags] = useState<string[]>([]);

    const form = useForm<TReviewPayload>({
  defaultValues: {
    content: '',
    spoiler: false,
    tags: [],
    rating: 0,
  },
});


    const [selectedRating, setSelectedRating] = useState(0); // State for rating
  
    const handleStarClick = (rating:any) => {
      setSelectedRating(rating);
      form.setValue('rating', rating); // Set rating value in the form
    };

      const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value && !tags.includes(value)) {
                setTags([...tags, value]);
            }
            e.currentTarget.value = '';
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };
  
const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  try {
    if (!user?.id || !mediaId?.id) {
    toast.error("UnAuthorized or Media missing");
    return;
  }
    const payload: TReviewPayload = {
      content: data.content,
      rating: selectedRating,
      tags,
      spoiler: data.spoiler,
      userId: user?.id,
      mediaId: mediaId.id,
    };

    const res = await addReview(payload);

    form.reset();
    setTags([]);
    setSelectedRating(0);

    if (res.success === true) {
       router.push(`/dashboard/user/review-management`)
      toast.success('Review added successfully and wait for approval and publish from Admin');
    } else {
      toast.warning('You have already added a review for this media');
    }
  } catch (error) {
    console.error('Error review:', error);
    toast.error('Failed to add review');
  }
};


    return (
        
          <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Review</DialogTitle>
        <DialogDescription>Review the Media.</DialogDescription>
      </DialogHeader>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            
            <FormField
              control={form.control}
              name="content"
              rules={{ required: 'Review is required.' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Review about the media"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Share your experience.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                            control={form.control}
                            name="spoiler"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange} 
                                        />
                                    </FormControl>
                                    <FormLabel>Spoiler</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
            <FormField control={form.control} name="tags" render={() => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Type and press Enter" onKeyDown={handleAddTag} />
                                    </FormControl>
                                    <FormDescription>Type and press Enter to add multiple tags (Add at least one tag)</FormDescription>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag) => (
                                            <span key={tag} className="bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center gap-2">
                                                {tag}
                                                <button type="button" onClick={() => handleRemoveTag(tag)}>
                                                    <X size={16} className="text-red-500" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </FormItem>
                            )} />
            <div className="my-4">
              <FormLabel className="mr-4">Rating</FormLabel>
              <div className='flex'>
                 {Array.from({ length: 10 }, (_, index) => (
                <Star
                  key={index}
                  className={`w-8 h-8 cursor-pointer ${
                    selectedRating > index ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleStarClick(index + 1)}
                />
              ))}
              </div>
             
              {selectedRating === 0 && (
                <p className="text-red-500 text-sm">Rating is required.</p>
              )}
            </div>

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
    </DialogContent>
    );
};

export default ReviewForm;