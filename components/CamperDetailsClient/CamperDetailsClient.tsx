"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCamperById } from "@/lib/api/clientApi";
import LoaderModal from "../LoaderModal/LoaderModal";
import CamperGallery from "../CamperGallery/CamperGallery";
import css from "./CamperDetailsClient.module.css";
import { formatLabel } from "@/lib/utils/fomatLabel";
import CamperReviews from "../CamperReviews/CamperReviews";
import BookingForm from "../BookingForm/BookingForm";

interface CamperDetailsClientProps {
  camperId: string;
}

export default function CamperDetailsClient({
  camperId,
}: CamperDetailsClientProps) {
  const {
    data: camper,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamperById(camperId),
  });

  if (isPending) {
    return <LoaderModal />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
    <div className={css.sectionWrapper}>
      <CamperGallery gallery={camper.gallery} />
      <div className={css.sectionTextWrapper}>
        <div className={css.infoWrapper}>
          <h2 className={css.title}>{camper.name}</h2>
          <div className={css.ratingWrapper}>
            <svg width={16} height={16} className={css.icon}>
              <use href="/icons/sprite.svg#icon-rating"></use>
            </svg>
            <p className={css.rating}>{camper.rating}</p>
            <p className={css.totalReviews}>({camper.totalReviews} Rewievs)</p>
            <svg width={16} height={16} className={css.iconLocal}>
              <use href="/icons/sprite.svg#icon-location"></use>
            </svg>
            <p className={css.location}>{camper.location}</p>
          </div>
          <p className={css.price}>€{camper.price}</p>
          <p className={css.description}>{camper.description}</p>
        </div>

        <div className={css.detailWrapper}>
          <h2 className={css.title}>Vehicle details</h2>
          <ul className={css.techWrapper}>
            <li className={css.categoryTech}>
              {formatLabel(camper.transmission)}
            </li>
            <li className={css.categoryTech}>{formatLabel(camper.engine)}</li>
            {camper.amenities.map((item) => (
              <li key={item} className={css.categoryTech}>
                {formatLabel(item)}
              </li>
            ))}
          </ul>
          <div className={css.tableWrapper}>
          <ul className={css.paramWrapper}>
            <li >Form</li>
            <li >Length</li>
            <li >Width</li>
            <li >Height</li>
            <li >Tank</li>
            <li >Consumption</li>
          </ul>
            <ul className={css.qualityWrapper}>
            <li >{formatLabel(camper.form)}</li>
            <li >{formatLabel(camper.length)}</li>
            <li >{formatLabel(camper.width)}</li>
            <li >{formatLabel(camper.height)}</li>
            <li >{formatLabel(camper.tank)}</li>
            <li >{formatLabel(camper.consumption)}</li>
          </ul>
        </div></div>
      </div>
      </div>
      <div className={css.review_bookingWrapper}>
      <CamperReviews camperId={camperId} />
        <BookingForm camperId={camperId} />
        </div>
      </>
  );
}
