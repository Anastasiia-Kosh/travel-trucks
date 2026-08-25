import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <section className={css.page}>
        <div className="container">
      <div className={css.intro}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.button}>
          View now
        </Link>
        </div>
        </div>
    </section>
  );
}
