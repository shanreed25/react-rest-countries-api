import { styles } from "../styles/styles";
import type { LayoutProps } from "../types/countryDisplayTypes";
import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className={styles.layoutHeader}>
        <div className={`${styles.container} ${styles.layoutHeaderRow}`}>
          <Link to="/" className={styles.layoutH1}>
            Where in the world?
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className={`${styles.container} py-6 md:py-12`}>{children}</main>
    </>
  );
}
