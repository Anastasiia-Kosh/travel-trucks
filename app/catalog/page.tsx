import css from "./CatalogPage.module.css";
import CatalogClient from "@/components/CatalogClient/CatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse available TravelTrucks campers and filter them by location, form, engine and transmission.",
};

export default function CatalogPage() {
  return (
    <section className={css.page}>
      <div className="container">
        <h1 className="visually-hidden">Camper catalog</h1>
        <CatalogClient />
      </div>
    </section>
  );
}
