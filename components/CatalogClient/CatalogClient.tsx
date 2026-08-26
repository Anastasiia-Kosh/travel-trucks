"use client";
import { fetchCampers } from "@/lib/api/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import CamperList from "../CamperList/CamperList";
import CamperFilter from "../CamperFilters/CamperFilters";
import { useState } from "react";
import { CamperFilterValues } from "@/types/camper";
import css from "./CatalogClient.module.css";
import Image from "next/image";

const initialFilters: CamperFilterValues = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function CatalogClient() {
  const [draftFilters, setDraftFilters] =
    useState<CamperFilterValues>(initialFilters);

  const [appliedFilters, setAppliedFilters] =
    useState<CamperFilterValues>(initialFilters);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["catalog", appliedFilters],
    queryFn: ({ pageParam }) =>
      fetchCampers({
        page: pageParam,
        ...appliedFilters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];
  const handleSearch = () => {
    setAppliedFilters({ ...draftFilters });
  };

  const handleClearFilters = () => {
    const clearedFilters = { ...initialFilters };

    setDraftFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const handleLoadMore = async () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (isError) {
    return <p>{error.message}</p>;
  }
  console.log("Застосовані фільтри:", appliedFilters);
  return (
    <section className={css.page}>
      <CamperFilter
        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />
      <div className={css.wrapper}>
        {isPending ? (
          <p>Loading campers...</p>
        ) : isError ? (
          <p>{error}</p>
        ) : campers.length > 0 ? (
          <>
            <CamperList campers={campers} />
            {hasNextPage && (
              <button
                className={css.button}
                type="button"
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        ) : (
          <div className={css.wrapperEmpty}>
            <div className={css.photoWrapper}>
              <Image
                src="/image/catalog/image_empty.png"
                alt="No campers found"
                fill
                className={css.photo}
                sizes="(min-width: 1440px) 488px"
              />
            </div>
            <h2 className={css.emptyTitle}>No campers found</h2>
            <p className={css.emptyDescr}>
              We couldn`t find any campers that match your filters. <br /> Try
              adjusting your search or clearing some filters.
            </p>
            <div className={css.emptyActions}>
              <button
                className={css.emptyClearButton}
                type="button"
                onClick={handleClearFilters}
              >
                <span className={css.clearIconBox} aria-hidden="true">
                  <svg className={css.clearIcon} width="12" height="12">
                    <use href="/icons/sprite.svg#icon-x-vector" />
                  </svg>
                </span>
                Clear filters
              </button>

              <button
                className={css.viewAllButton}
                type="button"
                onClick={handleClearFilters}
              >
                View all campers
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
