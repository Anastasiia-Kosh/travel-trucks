"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCamperFilters } from "@/lib/api/clientApi";
import type { CamperFilterValues } from "@/types/camper";
import css from "./CamperFilters.module.css";
import { formatLabel } from "@/lib/utils/formatLabel";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";

interface CamperFilterProps {
  draftFilters: CamperFilterValues;
  setDraftFilters: Dispatch<SetStateAction<CamperFilterValues>>;
  onSearch: () => void;
  onClear: () => void;
}

export default function CamperFilter({
  draftFilters,
  setDraftFilters,
  onSearch,
  onClear,
}: CamperFilterProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["camperFilters"],
    queryFn: fetchCamperFilters,
  });
  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className={css.formFilter}>
      <div className={css.locationGroup}>
        <label className={css.locationLabel} htmlFor="location">
          Location
        </label>

        <div className={css.locationField}>
          <svg
            className={css.locationIcon}
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/icons/sprite.svg#icon-location" />
          </svg>

          <input
            className={css.locationInput}
            type="text"
            name="location"
            id="location"
            placeholder="City"
            value={draftFilters.location}
            onChange={(event) =>
              setDraftFilters((previous) => ({
                ...previous,
                location: event.target.value,
              }))
            }
          />
        </div>
      </div>
      <h2 className={css.filtersTitle}>Filters</h2>

      <fieldset className={css.filterGroup}>
        <legend className={css.groupTitle}>Camper form</legend>
        <ul className={css.optionsList}>
          {data.forms.map((form) => (
            <li key={form} className={css.optionItem}>
              <input
                className={css.radio}
                type="radio"
                name="form"
                id={`form-${form}`}
                value={form}
                checked={draftFilters.form === form}
                onClick={() =>
                  setDraftFilters((previous) => ({
                    ...previous,
                    form: previous.form === form ? "" : form,
                  }))
                }
                readOnly
              />
              <label className={css.optionLabel} htmlFor={`form-${form}`}>
                {formatLabel(form)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={css.filterGroup}>
        <legend className={css.groupTitle}>Engine</legend>
        <ul className={css.optionsList}>
          {data.engines.map((engine) => (
            <li key={engine} className={css.optionItem}>
              <input
                className={css.radio}
                type="radio"
                name="engine"
                id={`engine-${engine}`}
                value={engine}
                checked={draftFilters.engine === engine}
                onClick={() =>
                  setDraftFilters((previous) => ({
                    ...previous,
                    engine: previous.engine === engine ? "" : engine,
                  }))
                }
                readOnly
              />
              <label className={css.optionLabel} htmlFor={`engine-${engine}`}>
                {formatLabel(engine)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className={css.filterGroup}>
        <legend className={css.groupTitle}>Transmission</legend>
        <ul className={css.optionsList}>
          {data.transmissions.map((transmission) => (
            <li key={transmission} className={css.optionItem}>
              <input
                className={css.radio}
                type="radio"
                name="transmission"
                id={`transmission-${transmission}`}
                value={transmission}
                checked={draftFilters.transmission === transmission}
                onClick={() =>
                  setDraftFilters((previous) => ({
                    ...previous,
                    transmission:
                      previous.transmission === transmission
                        ? ""
                        : transmission,
                  }))
                }
                readOnly
              />
              <label
                className={css.optionLabel}
                htmlFor={`transmission-${transmission}`}
              >
                {formatLabel(transmission)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <button className={css.searchButton} type="submit">
        Search
      </button>
      <button className={css.clearButton} type="button" onClick={onClear}>
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
    </form>
  );
}
