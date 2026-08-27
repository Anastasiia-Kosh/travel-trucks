"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { CamperImage } from "@/types/camper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import css from "./CamperGallery.module.css";

interface CamperGalleryProps {
  gallery: CamperImage[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const sortedGallery = [...gallery].sort(
    (first, second) => first.order - second.order,
  );

  return (
    <div className={css.gallery}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        grabCursor
        className={css.mainSwiper}
      >
        {sortedGallery.map((image, index) => (
          <SwiperSlide key={image.id} className={css.mainSlide}>
            <Image
              src={image.original}
              alt={`Camper photo ${index + 1}`}
              fill
              sizes="638px"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className={css.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={32}
        freeMode
        watchSlidesProgress
        className={css.thumbsSwiper}
      >
        {sortedGallery.map((image, index) => (
          <SwiperSlide key={image.id} className={css.thumbSlide}>
            <Image
              src={image.thumb}
              alt={`Camper thumbnail ${index + 1}`}
              fill
              sizes="136px"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className={css.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
