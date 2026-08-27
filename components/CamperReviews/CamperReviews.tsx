"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCamperReviews } from "@/lib/api/clientApi";
import { Rating } from "react-simple-star-rating";
import css from "./CamperReviews.module.css";

interface CamperReviewsProps {
  camperId: string;
}

export default function CamperReviews({ camperId }: CamperReviewsProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => fetchCamperReviews(camperId),
  });
  if (isPending) {
    return <p>Loading reviews...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  if (data.length === 0) {
    return <p>No reviews yet.</p>;
  }

  const getAuthorInitial = (value: string): string => {
    return value.trim().charAt(0).toUpperCase() || "?";
  };

  return (
    <div className={css.reviewsWrapper}>
      <h2 className={css.reviewstitle}>Reviews</h2>
      <ul className={css.reviewCards}>
        {data.map((review) => (
          <li key={review.id} className={css.reviewCard}>
            <div className={css.authorInfo}>
              <p className={css.authorABC}>
                {getAuthorInitial(review.reviewer_name)}
              </p>
              <div className={css.ratingInfo}>
                <h3 className={css.reviewsAuthor}>{review.reviewer_name}</h3>
                <Rating
                  initialValue={review.reviewer_rating}
                  iconsCount={5}
                  readonly
                  size={16}
                  fillColor="var(--rating)"
                  emptyColor="var(--gray-light)"
                  allowFraction={false}
                  SVGstyle={{ display: "inline-block" }}
                />
              </div>
            </div>
            <p className={css.reviewsText}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
