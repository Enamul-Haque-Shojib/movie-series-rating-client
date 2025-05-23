"use client";

import * as React from "react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
// import Logo from "@/assets/svgs/Logo";
import { Gauge, Users, List } from "lucide-react";
import { useUser } from "@/context/UserContext";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {user} = useUser();

    const role1 = user?.role === "ADMIN" ? "admin" : "user"

    const data = {
  
      Admin: [
        { title: "Dashboard", url: "/dashboard", icon: Gauge, isActive: true, },
        { title: "Media Management", url: `/dashboard/${role1}/listing`, icon: Users },
        { title: "Review Management", url: `/dashboard/${role1}/review-management`, icon: List },
        { title: "Purchase Management", url: `/dashboard/${role1}/purchase-management`, icon: List },
        { title: "Pick Management", url: `/dashboard/${role1}/pick-management`, icon: List },
       
      ],
      User: [
        { title: "Dashboard", url: "/dashboard", icon: Gauge, isActive: true, },
        { title: "Purchase Media", url: `/dashboard/${role1}/listing`, icon: List },
        { title: "Review Management", url: `/dashboard/${role1}/review-management`, icon: List },
        { title: "Watch List", url: `/dashboard/${role1}/watchlist`, icon: List },
       
      ],
   
};
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  {/* <Logo /> */}
                  <h1 className="text-xl">DS</h1>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">Dream Shop</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
            user?.role == 'ADMIN' ? <NavMain items={data.Admin} /> : <NavMain items={data.User} />
        }
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
