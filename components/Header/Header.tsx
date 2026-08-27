"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerInner}>
          <Link
            href="/"
            aria-label="TravelTrucks"
            className={css.logo}
            prefetch={false}
          >
            Travel<span className={css.logoAccent}>Trucks</span>
          </Link>

          <nav aria-label="Main Navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li className={css.navLink}>
                <Link
                  href="/"
                  className={pathname === "/" ? css.activeLink : undefined}
                  prefetch={false}
                >
                  Home
                </Link>
              </li>
              <li className={css.navLink}>
                <Link
                  href="/catalog"
                  prefetch={false}
                  className={
                    pathname.startsWith("/catalog") ? css.activeLink : undefined
                  }
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
