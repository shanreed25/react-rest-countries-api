import { styles } from "../styles/styles";
import type { LayoutProps } from "../types/countryDisplayTypes";
import { Link } from "react-router";

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className={styles.layoutHeader}>
        <div className={`${styles.container} py-6`}>
          <Link to="/" className={styles.layoutH1}>
            REST Countries API
          </Link>
        </div>
      </header>
      <main className={`${styles.container} py-6 md:py-12`}>{children}</main>
    </>
  );
}
