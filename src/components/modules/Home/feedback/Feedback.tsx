"use client";

import React, { useEffect, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";


// Define the Feedback type
interface FeedbackType {
  id: string;
  name: string;
  feedbackUserPhoto?: string;
  lifeStyle: string;
  feedBack: string;
}

const feedbackData = [
    {
        id:'1',
        feedbackUserPhoto:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Jack Robart',
        lifeStyle:'Engineering',
        feedBack:"The storyline was gripping and the cinematography was stunning. I couldn’t take my eyes off the screen for a moment"
    },
    {
        id:'2',
        feedbackUserPhoto:'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'David Smith',
        lifeStyle:'Frequent Traveler',

        feedBack:"I binge-watched the entire season in one weekend! The characters are so well-developed, and the plot twists are jaw-dropping."
  
    },
    {
        id:'3',
        feedbackUserPhoto:'https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=',

        name: 'Sophia Martinez',
        lifeStyle:'Business Consultant',
        feedBack:"Great weekend entertainment. Some episodes were slow, but the overall series was enjoyable and well-acted."
    },
    {
        id:'4',

        feedbackUserPhoto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAe9NZZk7nUE_anJir2Scf7tsqMHRdEpCbJg&s',
        name: 'Robert Williams',
        lifeStyle:'Adventure Enthusiast',
        feedBack:"The emotional depth of the movie really touched me. The lead actor’s performance was absolutely phenomenal."
    },
    {
        id:'5',
        feedbackUserPhoto:'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-olly-774909.jpg&fm=jpg',
        name: 'Emma Johnson',
        lifeStyle:'Family Traveler',
        feedBack: "We watched this movie as a family and everyone loved it! It had humor, heart, and a message worth remembering."


    },
]

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

    useEffect(() => {
        setFeedbacks(feedbackData);
  
    },[])

  return (
    <div className="my-[100px] lg:w-[90%] mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Feedback</h1>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        virtual
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback.id}>
            <div className="flex flex-col items-center justify-evenly w-full h-[350px] p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white">
              <Image
                src={feedback.feedbackUserPhoto || "/default-user.jpg"} // Fallback image
                alt={`${feedback.name}'s photo`}
                className="w-[80px] h-[80px] rounded-full shadow-md object-cover"
                width={80}
                height={80}
              />
              <h2 className="text-xl font-semibold text-gray-700 text-center">{feedback.name}</h2>
              <p className="text-sm text-blue-600 italic text-center">{feedback.lifeStyle}</p>
              <p className="text-gray-600 text-center">{feedback.feedBack}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
