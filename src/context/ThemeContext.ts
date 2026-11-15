import { createContext, useContext } from "react";
import type { ThemeContextType } from "../types/theme";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
