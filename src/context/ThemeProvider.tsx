import { useEffect, useState } from "react";
import type { Theme, ThemeProviderProps } from "../types/theme";
import { getInitialTheme, saveTheme } from "../utils/themeUtils";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: ThemeProviderProps) {

  const [theme, setTheme] = useState<Theme>(getInitialTheme);//calls it once on the first render only

  useEffect(() => {
  //index.css reads <html data-theme="dark"> or <html data-theme="light">
  document.documentElement.dataset.theme = theme;
  saveTheme(theme);
}, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}