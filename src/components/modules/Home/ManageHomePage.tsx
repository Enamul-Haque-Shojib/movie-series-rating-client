
"use client";

import React from "react";
import Banner from "./banner/Banner";
import Features from "./features/Features";
import Feedback from "./feedback/Feedback";

import QuickAccess from "./quickAccess.tsx/QuickAccess";

const ManageHomePage = () => {



  return (
    <div>
      <Banner />

      <Features />
      <QuickAccess></QuickAccess>
      <Feedback />
    </div>
  );
};

export default ManageHomePage;




