"use client";
import { fetchCampers } from "@/lib/api/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import CamperList from "../CamperList/CamperList";
import CamperFilter from "../CamperFilters/CamperFilters";
import { useEffect, useState } from "react";
import { CamperFilterValues } from "@/types/camper";
import css from "./CatalogClient.module.css";
import Image from "next/image";
import LoaderModal from "../LoaderModal/LoaderModal";

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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  useEffect(() => {
    if (!isFiltersOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFiltersOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFiltersOpen]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetching,
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
    setIsFiltersOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = { ...initialFilters };

    setDraftFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setIsFiltersOpen(false);
  };

  const handleLoadMore = async () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    await fetchNextPage();
  };
  const showFullLoader = isFetching && !isFetchingNextPage;
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div className={css.page}>
      <button
        className={css.openFiltersButton}
        type="button"
        onClick={() => setIsFiltersOpen(true)}
        aria-expanded={isFiltersOpen}
        aria-controls="catalog-filters"
      >
        Filters
      </button>

      <div
        id="catalog-filters"
        className={`${css.filterPanel} ${
          isFiltersOpen ? css.filterPanelOpen : ""
        }`}
      >
        <div className={css.filterPanelHeader}>
          <button
            type="button"
            className={css.closeFiltersButton}
            onClick={() => setIsFiltersOpen(false)}
            aria-label="Close filters"
          >
            <svg
              className={css.closeFiltersIcon}
              width="12"
              height="12"
              aria-hidden="true"
            >
              <use href="/icons/sprite.svg#icon-x-vector" />
            </svg>
          </button>
        </div>
        <CamperFilter
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />
      </div>
      <div className={css.wrapper}>
        {showFullLoader && <LoaderModal />}
        {!isPending &&
          (campers.length > 0 ? (
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
                  sizes="(min-width: 768px) 488px, 90vw"
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
                    <svg
                      className={css.clearIcon}
                      width="12"
                      height="12"
                      aria-hidden="true"
                      focusable="false"
                    >
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
          ))}
      </div>
    </div>
  );
}
