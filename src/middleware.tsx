import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";






const authRoutes = ["/login", "/register"];



export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();


  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `https://movie-series-rating-server.vercel.app/api/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:page",
    
   
  ],
};
