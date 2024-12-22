"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import trustedPartners from "@/data/companies";
import Image from "next/image";

const TrustedPartnersCarousel = () => {
  return (
    <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {trustedPartners?.map(({ name, path, id }) => {
          return (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <Image
                src={path}
                alt={name}
                width={200}
                height={56}
                className="h-9 sm:h-14 w-auto object-contain"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default TrustedPartnersCarousel;
