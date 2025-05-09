"use server";


  export const getReviewCommentByReviewId = async (id: string) => {
    

    try {
      const res = await fetch(
        `http://localhost:3001/api/user-action/get-review-comment/${id}`,
        {
          next: {
            tags: ["MEDIA"],
          },
        }
      );
      const data = await res.json();
   
      
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };