import { styles } from "../styles/styles";
import type { LayoutProps } from "../types/country";


export function Layout({children}: LayoutProps) {
  return (
    <>
      <header className={styles.layoutHeader}>
        <div className={`${styles.container} py-6`}>
          <h1 className={styles.layoutH1}>REST Countries API</h1>
        </div>
      </header>
      <main className={`${styles.container} py-6 md:py-12`} >
            {children}
      </main>
    </>
  );
}