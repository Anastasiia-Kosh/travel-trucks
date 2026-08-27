import type { Camper } from "@/types/camper";
// import Link from "next/link";
import css from "./CamperCard.module.css";
import Image from "next/image";
import { formatLabel } from "@/lib/utils/formatLabel";

interface CamperCardProps {
  camper: Camper;
  eagerImage?: boolean;
}

export default function CamperCard({
  camper,
  eagerImage = false,
}: CamperCardProps) {
  return (
    <article className={css.card}>
      <div className={css.wrapper}>
        <div className={css.photoWrapper}>
          <Image
            src={camper.coverImage}
            alt={camper.name}
            fill
            className={css.photo}
            sizes="(min-width: 1440px) 219px"
            loading={eagerImage ? "eager" : "lazy"}
            fetchPriority={eagerImage ? "high" : "auto"}
          />
        </div>
        <div className={css.cardWrapper}>
          <div className={css.nameWrapper}>
            <h2 className={css.title}>{camper.name}</h2>
            <p className={css.price}>€{camper.price}</p>
          </div>
          <div className={css.ratingWrapper}>
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
            <p className={css.totalReviews}>({camper.totalReviews} Reviews)</p>
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
          <p className={css.description}>{camper.description}</p>
          <div className={css.techWrapper}>
            <p className={css.categoryFilter}>
              <svg
                width={20}
                height={20}
                className={css.iconTech}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/icons/sprite.svg#icon-petrol"></use>
              </svg>
              {formatLabel(camper.engine)}
            </p>
            <p className={css.categoryFilter}>
              <svg
                width={20}
                height={20}
                className={css.iconTech}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/icons/sprite.svg#icon-automatic"></use>
              </svg>
              {formatLabel(camper.transmission)}
            </p>
            <p className={css.categoryFilter}>
              <svg
                width={20}
                height={20}
                className={css.iconTech}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/icons/sprite.svg#icon-alcove"></use>
              </svg>
              {formatLabel(camper.form)}
            </p>
          </div>
          <a
            href={`/catalog/${camper.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={css.button}
          >
            Show more
          </a>
        </div>
      </div>
    </article>
  );
}
