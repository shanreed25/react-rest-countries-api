import { useTheme } from "../context/ThemeContext";
import { MoonIcon } from "./Icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();//reads the context from ThemeProvider
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}//tells screen readers whether dark mode is on or off
      className="flex items-center gap-2 text-xs font-semibold md:text-base"
    >
      <MoonIcon filled={isDark} className="size-4 md:size-5" />
      Dark Mode
    </button>
  );
}
