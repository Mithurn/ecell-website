"use client";

import Carousel from "@/components/ui/carousel";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Technical",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1607743386830-f198fbd7f9c4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Creatives",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1697725280320-e48c8cc4f074?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fENSRUFUSVZFU3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Corporate",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q09SUE9SQVRFfGVufDB8fDB8fHww",
    },
    {
      title: "Media & Marketing",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1730337372713-a23c9c2be77c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TUVESUElMjBBTkQlMjBNQVJLRVRJTkd8ZW58MHx8MHx8fDA%3D",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
