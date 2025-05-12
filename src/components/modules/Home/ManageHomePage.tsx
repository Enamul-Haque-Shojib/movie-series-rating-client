
"use client";

import React from "react";
import Banner from "./banner/Banner";
import Features from "./features/Features";
import Feedback from "./feedback/Feedback";

import QuickAccess from "./quickAccess.tsx/QuickAccess";
import StatsMedia from "./stats/StatsMedia";

const ManageHomePage = () => {



  return (
    <div>
      <Banner />
      <StatsMedia></StatsMedia>
      <Features />
      <QuickAccess></QuickAccess>
      <Feedback />
    </div>
  );
};

export default ManageHomePage;




