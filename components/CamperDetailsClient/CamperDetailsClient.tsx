"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCamperById } from "@/lib/api/clientApi";
import LoaderModal from "../LoaderModal/LoaderModal";
import CamperGallery from "../CamperGallery/CamperGallery";
import css from "./CamperDetailsClient.module.css";
import { formatLabel } from "@/lib/utils/formatLabel";
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
            <h1 className={css.title}>{camper.name}</h1>
            <div className={css.ratingWrapper}>
              <div className={css.ratingGroup}>
              <svg
                width={16}
                height={16}
                className={css.icon}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/icons/sprite.svg#icon-rating"></use>
              </svg>
              <p className={css.rating}>{camper.rating}</p>
              <p className={css.totalReviews}>
                ({camper.totalReviews} Reviews)
                </p>
              </div>
              <div className={css.locationGroup}>
              <svg
                width={16}
                height={16}
                className={css.iconLocal}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/icons/sprite.svg#icon-location"></use>
              </svg>
                <p className={css.location}>{camper.location}</p>
                </div>
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
              <li className={css.categoryTech}>{formatLabel(camper.form)}</li>
              {camper.amenities.map((item) => (
                <li key={item} className={css.categoryTech}>
                  {formatLabel(item)}
                </li>
              ))}
            </ul>
            <dl className={css.tableWrapper}>
              <div className={css.detailRow}>
                <dt>Form</dt>
                <dd>{formatLabel(camper.form)}</dd>
              </div>

              <div className={css.detailRow}>
                <dt>Length</dt>
                <dd>{camper.length}</dd>
              </div>

              <div className={css.detailRow}>
                <dt>Width</dt>
                <dd>{camper.width}</dd>
              </div>

              <div className={css.detailRow}>
                <dt>Height</dt>
                <dd>{camper.height}</dd>
              </div>

              <div className={css.detailRow}>
                <dt>Tank</dt>
                <dd>{camper.tank}</dd>
              </div>

              <div className={css.detailRow}>
                <dt>Consumption</dt>
                <dd>{camper.consumption}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className={css.review_bookingWrapper}>
        <CamperReviews camperId={camperId} />
        <BookingForm camperId={camperId} />
      </div>
    </>
  );
}
