
"use client";


import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';

import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';
import { getTotalMediaStatisticsForUser } from '@/services/Statistics';

const UserDashboard = () => {
const {user} = useUser();


const [userMediaData, setUserMediaData] = useState<{
  totalPurchasedMovies: number;
  totalPurchasedSeries: number;
  totalWatchlist: number;
  totalPublishedReviews: number;
  totalUnpublishedReviews: number;
} | null>(null);


  useEffect(() => {
    const fetchAllItems = async () => {
      if (!user?.id) return; 
      const res = await getTotalMediaStatisticsForUser(user?.id);
      
      setUserMediaData(res?.data);
    };
    fetchAllItems();
  }, [user?.id]);


    const pieChartOptions = {
        labels: ["Purchase Movie", "Purchase Series", "Watch List", "Published Review", "UnPublished Review"],
      };
   


      const pieChartSeries = userMediaData
  ? [
      userMediaData?.totalPurchasedMovies, userMediaData?.totalPurchasedSeries, userMediaData?.totalWatchlist, userMediaData?.totalPublishedReviews, userMediaData?.totalUnpublishedReviews
    ]
  : [];

  if (!userMediaData) {
  return (
    <div className="flex justify-center items-center h-96">
      <Loader className="animate-spin text-gray-400 w-10 h-10" />
    </div>
  );
}
    return (
        <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      
        
         <Card className="col-span-1 flex items-center p-4">
          <AspectRatio ratio={16 / 9}>
                    <Image
                      src={user?.photoUrl || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                      alt="Image"
                      width={300}
                      height={250}
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
          <div className="ml-4">
            <h2 className="text-lg font-bold">Welcome, {user?.name}!</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </Card>
        
        {
            userMediaData ? <Card className="col-span-1">
            <CardContent>
              <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={250} />
            </CardContent>
          </Card>
          :
          <div className="flex justify-center items-center h-96 col-span-1">
          <Loader className="animate-spin text-gray-400 w-10 h-10" />
        </div>
  
        }
        
        
         <div className="border col-span-1 md:col-span-2 lg:col-span-3 flex justify-around p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold">{userMediaData?.totalPurchasedMovies}</h4>
            <p className="text-gray-500">Purchase Movie</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{userMediaData?.totalPurchasedSeries}</h4>
            <p className="text-gray-500">Purchase Series</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{userMediaData?.totalWatchlist}</h4>
            <p className="text-gray-500">Watch List</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{userMediaData?.totalPublishedReviews}</h4>
            <p className="text-gray-500">Published Review</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{userMediaData?.totalUnpublishedReviews}</h4>
            <p className="text-gray-500">UnPublished Review</p>
          </div>
        </div>

      
  
       
      </div>
    );
};

export default UserDashboard;