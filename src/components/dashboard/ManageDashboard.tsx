

"use client";

import { useUser } from "@/context/UserContext";
import React from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";




const ManageDashboard = () => {

const {user} = useUser();

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {
        user?.role==="ADMIN" ?
         <AdminDashboard></AdminDashboard>
          : 
          <UserDashboard></UserDashboard>
      }
    </div>
  );
};

export default ManageDashboard;


