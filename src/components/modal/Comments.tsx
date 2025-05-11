/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const Comments = ({comment}:any) => {
    console.log(comment)
     return (
        <div>
            <Card className="group w-full h-full transition-transform transform hover:scale-101 shadow-lg hover:shadow-xl bg-gradient-to-br rounded-xl overflow-hidden">
      <CardHeader className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Avatar>
                <AvatarImage src={comment?.user?.photoUrl} alt="User" />
              </Avatar>
            <div>
              <CardTitle className="font-semibold text-yellow-800">
                {comment.user.name}
              </CardTitle>
            <p>{comment.createdAt.slice(0,10)}</p>  
            </div>
            
          </div>
        
        </div>
        <CardDescription className="text-gray-700 leading-relaxed">
          {comment.userComment}
        </CardDescription>
      </CardHeader>
    </Card>
        </div>
    );
};

export default Comments;