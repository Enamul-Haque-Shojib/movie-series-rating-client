
import { getTotalMediaStatisticsForAdmin } from '@/services/Statistics';
import React, { useEffect, useState } from 'react';

const StatsMedia = () => {

  const [statsData, setStatsData] = useState<{
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
      setStatsData(res?.data);
  
    };
    fetchAllItems();
  }, []);
  

    return (
        
        <div className="lg:w-[90%] w-[95%] mx-auto my-10">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl ">
    <div className="stat flex flex-col items-center p-4 bg-card rounded-lg shadow hover:shadow-lg transition duration-300">
      <div className="stat-title text-lg font-semibold text-gray-600 text-center">Movie</div>
      <div className="stat-value text-4xl font-bold text-blue-600 text-center">{statsData?.totalMovies}+</div>
      <div className="stat-desc text-sm text-gray-500 text-center">Total Movies</div>
    </div>

    <div className="stat flex flex-col items-center p-4 bg-card rounded-lg shadow hover:shadow-lg transition duration-300">
      <div className="stat-title text-lg font-semibold text-gray-600 text-center">Series</div>
      <div className="stat-value text-4xl font-bold text-blue-600 text-center">{statsData?.totalSeries}+</div>
      <div className="stat-desc text-sm text-gray-500 text-center">Total Series</div>
    </div>

    <div className="stat flex flex-col items-center p-4 bg-card rounded-lg shadow hover:shadow-lg transition duration-300">
      <div className="stat-title text-lg font-semibold text-gray-600 text-center">Reviews</div>
      <div className="stat-value text-4xl font-bold text-blue-600 text-center">{statsData?.averageMediaRating}+</div>
      <div className="stat-desc text-sm text-gray-500 text-center">10-rated media avg reviews</div>
    </div>

    <div className="stat flex flex-col items-center p-4 bg-card rounded-lg shadow hover:shadow-lg transition duration-300">
      <div className="stat-title text-lg font-semibold text-gray-600 text-center">App User</div>
      <div className="stat-value text-4xl font-bold text-blue-600 text-center">{statsData?.totalUsers}+</div>
      <div className="stat-desc text-sm text-gray-500 text-center">Users joined</div>
    </div>
  </div>
</div>

        
    );
};

export default StatsMedia;