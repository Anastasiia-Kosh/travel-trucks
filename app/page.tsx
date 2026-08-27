import css from "./page.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rent a comfortable camper and start your next journey with TravelTrucks.",
};

export default function Home() {
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.intro}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.description}>
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog" className={css.button} prefetch={false}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
