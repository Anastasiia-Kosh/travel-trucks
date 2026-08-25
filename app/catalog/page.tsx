import { fetchCampers } from "@/lib/api/clientApi";
import css from "./CatalogPage.module.css"


export default async function Catalog() {
  const { campers } = await fetchCampers();
  return (
    <section className={css.page}>
        <div className="container">
        <p>Catalog</p>
        {campers.map((camper) => (
          <div key={camper.id}>
            <h2>{camper.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

