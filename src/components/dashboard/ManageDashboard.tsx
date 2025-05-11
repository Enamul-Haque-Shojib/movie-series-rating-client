

"use client";

import { useUser } from "@/context/UserContext";
import React from "react";




const ManageDashboard = () => {

const {user} = useUser()
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {
        user?.role==="ADMIN" ? <h1>Welcome to Admin Dashboard</h1> : <h1>Welcome to User Dashboard</h1>
      }
    </div>
  );
};

export default ManageDashboard;


