
"use client";

// import React from "react";
// import Banner from "./banner/Banner";
// import Features from "./features/Features";
// import Feedback from "./feedback/Feedback";
// import { getAllItems } from "@/services/itemService";
// import { useUser } from "@/context/UserContext";
// import { useRouter } from "next/navigation";
// import Categories from "./categories/Categories";

// const ManageHomePage = () => {
//   const { setProducts } = useUser();
//   const router = useRouter();



//   return (
//     <div>
//       <Banner />
//       {/* <Categories handleHomeCategories={handleHomeCategories} /> */}
//       {/* <Features /> */}
//       {/* <Feedback /> */}
//     </div>
//   );
// };

// export default ManageHomePage;


import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState("");

  const featured = [
    { title: "Inception", rating: 9.1 },
    { title: "The Last of Us", rating: 8.9 },
  ];

  const topRated = [
    { title: "Breaking Bad", rating: 9.5 },
    { title: "Dark", rating: 9.3 },
  ];

  const newlyAdded = [
    { title: "Fallout", year: 2025 },
    { title: "The Gentlemen", year: 2025 },
  ];

  const editorsPicks = [
    { title: "Severance", curator: "Admin" },
    { title: "Mindhunter", curator: "Admin" },
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold">Movie & Series Portal</h1>
      <i className="fa-solid fa-heart"></i>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <Input placeholder="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
        <Input placeholder="Release Year" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>

      {/* Featured Section */}
      <section>
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
      </section>

      {/* Quick-access Sections */}
      <Tabs defaultValue="top-rated">
        <TabsList className="flex gap-4">
          <TabsTrigger value="top-rated">Top Rated This Week</TabsTrigger>
          <TabsTrigger value="newly-added">Newly Added</TabsTrigger>
          <TabsTrigger value="editors-picks">Editor’s Picks</TabsTrigger>
        </TabsList>

        <TabsContent value="top-rated">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {topRated.map((item, i) => (
              <Card key={i} className="rounded-2xl shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>Rating: {item.rating}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="newly-added">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {newlyAdded.map((item, i) => (
              <Card key={i} className="rounded-2xl shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>Year: {item.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editors-picks">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {editorsPicks.map((item, i) => (
              <Card key={i} className="rounded-2xl shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>Curated by: {item.curator}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

