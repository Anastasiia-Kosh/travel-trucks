
import css from "./CatalogPage.module.css"
import CatalogClient from "@/components/CatalogClient/CatalogClient";


export default  function CatalogPage() {

  return (
    <section className={css.page}>
        <div className="container">
        <CatalogClient />
      </div>
    </section>
  );
}

  