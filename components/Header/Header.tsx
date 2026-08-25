"use client";

import Link from "next/link";
import css from "./Header.module.css"
import { usePathname } from "next/dist/client/components/navigation";

export default function Header() {
      const pathname = usePathname();
  return (
       <header className={css.header}>
      <div className="container">
        <div className={css.headerInner}>
          <Link href="/" aria-label="TravelTrucks" className={css.logo}>
            Travel<span className={css.logoAccent}>Trucks</span>
          </Link>
    
          <nav aria-label="Main Navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li className={css.navLink}>
              <Link
                href="/"
                className={pathname === "/" ? css.activeLink : undefined}
              >
                Home
                </Link>
                </li>
              <li className={css.navLink}>
              <Link
                href="/catalog"
                className={pathname === "/catalog" ? css.activeLink : undefined}
              >
                Catalog
                </Link>
                </li>

            </ul>
          </nav>
              </div>
              </div>
              </header>
  )
}