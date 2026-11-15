import type { Theme } from "../types/theme";

const THEME_KEY = "theme";

/*
on the first render the theme the user chose is used or the system default setting
*/
export function getInitialTheme(): Theme {
    //localStorage can throw an error
  // so getting the key is wrapped in try/catch 
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // use the system setting
  }

  //if the OS or browser is set to dark mode .matches is true
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";//system setting
}

/*
saves what the user chose so it presists after a reload
*/
export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // theme will still work until the page is reloaded
  }
}