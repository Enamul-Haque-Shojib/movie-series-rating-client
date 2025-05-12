"use client";


import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';

import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';
import { getTotalMediaStatisticsForAdmin } from '@/services/Statistics';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AdminDashboard = () => {
const {user} = useUser();

const [adminMediaData, setAdminMediaData] = useState<{
  totalMovies: number;
  totalSeries: number;
  totalPurchasedMedia: number;
  averageMediaRating: number;
  averageReviewRating: number;
  totalUsers: number;
} | null>(null);




useEffect(() => {
  const fetchAllItems = async () => {
   
    const res = await getTotalMediaStatisticsForAdmin();
    setAdminMediaData(res?.data);

  };
  fetchAllItems();
}, []);


   const pieChartOptions = {
  labels: [
    "Total Movie",
    "Total Series",
    "Total Purchased Media",
    "Average Media Rating",
    "Average Review Rating",
    "Total Users",
  ],
};

const pieChartSeries = adminMediaData
  ? [
      adminMediaData.totalMovies,
      adminMediaData.totalSeries,
      adminMediaData.totalPurchasedMedia,
      adminMediaData.averageMediaRating,
      adminMediaData.averageReviewRating,
      adminMediaData.totalUsers,
    ]
  : [];

       if (!adminMediaData) {
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
                        src={user?.photoUrl || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"} // Make sure this fallback exists in your public folder
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
            adminMediaData ? <Card className="col-span-1">
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
            <h4 className="text-xl font-bold">{adminMediaData?.totalMovies}</h4>
            <p className="text-gray-500">Total Movie</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{adminMediaData?.totalSeries}</h4>
            <p className="text-gray-500">Total Series</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{adminMediaData?.averageMediaRating}</h4>
            <p className="text-gray-500">Average Media Rating</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{adminMediaData?.averageReviewRating}</h4>
            <p className="text-gray-500">Average Review</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold">{adminMediaData?.totalUsers}</h4>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div> 

      
  
       
      </div>
    );
};

export default AdminDashboard;