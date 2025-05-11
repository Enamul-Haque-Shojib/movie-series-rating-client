import * as React from "react";
import {
  Card,
  CardContent,

} from "@/components/ui/card";


const Features = () => {
  const featured = [
    { title: "Inception", rating: 9.1 },
    { title: "The Last of Us", rating: 8.9 },
  ];
  return (
    <div className="lg:w-[85%] w-[95%] mx-auto my-12">
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {featured.map((item, i) => (
             <Card key={i} className="rounded-2xl shadow">
               <CardContent className="p-4">
                 <h3 className="text-lg font-bold">{item.title}</h3>
                 <p>Rating: {item.rating}</p>
               </CardContent>
             </Card>
           ))}
         </div>
    </div>
  );
};

export default Features;
